"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, X, Send, Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useToast } from "@/components/Toast";

interface IntakeForm {
  role: string;
  problem: string;
  timeline: string;
  budget: string;
  links: string;
  email: string;
}

const empty: IntakeForm = { role: "", problem: "", timeline: "", budget: "", links: "", email: "" };

function buildSubject(f: IntakeForm) {
  return `Hire: ${f.role || "open role"} (${f.timeline || "no timeline"})`;
}

function buildBody(f: IntakeForm) {
  return [
    `Role: ${f.role || "-"}`,
    `Timeline: ${f.timeline || "-"}`,
    `Budget: ${f.budget || "-"}`,
    `Email: ${f.email || "-"}`,
    "",
    "Problem:",
    f.problem || "-",
    "",
    "Relevant links:",
    f.links || "-",
  ].join("\n");
}

export default function HireNikoCTA() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return Boolean(window.sessionStorage.getItem("hire-cta-dismissed"));
    } catch {
      return false;
    }
  });
  const [form, setForm] = useState<IntakeForm>(empty);
  const [sending, setSending] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!open) return;

    const triggerEl = triggerRef.current;
    const dialog = dialogRef.current;
    const focusTimer = window.setTimeout(() => {
      const firstInput = dialog?.querySelector<HTMLElement>(
        "input, textarea, button:not([disabled]), [tabindex]:not([tabindex='-1'])"
      );
      firstInput?.focus();
    }, 20);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && dialog) {
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      triggerEl?.focus();
    };
  }, [open]);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("hire-cta-dismissed", "1");
      } catch {
        // Ignore sessionStorage restrictions.
      }
    }
    setDismissed(true);
    setOpen(false);
  };

  const close = () => setOpen(false);

  const buildMailto = (f: IntakeForm) =>
    `mailto:${siteConfig.email}?subject=${encodeURIComponent(buildSubject(f))}&body=${encodeURIComponent(buildBody(f))}`;

  const copyBrief = async () => {
    const briefText = `To: ${siteConfig.email}\nSubject: ${buildSubject(form)}\n\n${buildBody(form)}`;
    try {
      await navigator.clipboard.writeText(briefText);
      showToast(`Brief & ${siteConfig.email} copied to clipboard!`);
    } catch {
      showToast(`Email Niko directly at ${siteConfig.email}`);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const url = buildMailto(form);
    window.location.href = url;
    setTimeout(() => {
      setSending(false);
      setOpen(false);
      setForm(empty);
      showToast("Email draft opened. Hit send in your mail client.");
    }, 600);
  };

  if (dismissed) return null;

  return (
    <>
      <motion.button
        ref={triggerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform cursor-pointer"
        aria-label="Open hire Niko form"
      >
        <Briefcase className="h-4 w-4" />
        <span className="text-sm font-semibold">Hire Niko</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={close}
          >
            <motion.div
              ref={dialogRef}
              initial={{ scale: 0.96, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 8, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-card-border bg-background p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hire-niko-title"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <h3 id="hire-niko-title" className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">
                    Hire Niko
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full p-1 hover:bg-card transition-colors cursor-pointer"
                  aria-label="Close hire form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={submit} className="space-y-3">
                <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="Senior Data Engineer" />
                <Textarea label="Problem" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} placeholder="What problem are you trying to solve?" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Timeline" value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} placeholder="6 weeks" />
                  <Field label="Budget" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} placeholder="$10–20k" />
                </div>
                <Field label="Your email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@company.com" required />
                <Field label="Relevant links" value={form.links} onChange={(v) => setForm({ ...form, links: v })} placeholder="job spec, repo, brief" />

                <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={dismiss}
                    className="px-4 py-2 text-sm rounded-full border border-card-border hover:bg-card transition-colors cursor-pointer"
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    onClick={copyBrief}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-card-border hover:bg-card transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                    Copy brief
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                  >
                    {sending ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    {sending ? "Opening..." : "Send"}
                  </button>
                </div>
              </form>
              <p className="mt-3 text-xs text-muted">
                Opens your mail client with the details pre-filled, or copy the brief to send from webmail. No data is stored.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
      />
    </label>
  );
}
