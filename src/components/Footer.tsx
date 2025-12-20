"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-card-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-muted text-sm">
          &copy; {currentYear} Niko Pastore. All rights reserved.
        </p>
        <p className="text-muted text-sm">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
