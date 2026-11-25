"use client";

import { useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Matter from "matter-js";

interface PhysicsTag {
  id: string;
  text: string;
  width: number;
  height: number;
  isCircle?: boolean;
  icon?: string;
}

const PHYSICS_TAGS: PhysicsTag[] = [
  { id: "tag-1", text: "DATA ENGINEERING", width: 340, height: 60 },
  { id: "tag-2", text: "LLM ORCHESTRATION / RAG", width: 480, height: 60 },
  { id: "tag-3", text: "FULL STACK", width: 230, height: 60 },
  { id: "tag-4", text: "PYTHON", width: 170, height: 60 },
  { id: "tag-5", text: "CLOUD ARCHITECTURE", width: 380, height: 60 },
  { id: "tag-6", text: "REACT / NEXT.JS", width: 300, height: 60 },
  { id: "circle-1", text: "✱", width: 65, height: 65, isCircle: true, icon: "asterisk" },
  { id: "circle-2", text: "→", width: 65, height: 65, isCircle: true, icon: "arrow" },
];

interface MatterMouseWithWheel extends Matter.Mouse {
  mousewheel?: EventListenerOrEventListenerObject;
}

const PHYSICS_TAGS_MAP = new Map(PHYSICS_TAGS.map((tag) => [tag.id, tag]));
const SKILL_PILLS = PHYSICS_TAGS.filter((t) => !t.isCircle);

const emptySubscribe = () => () => {};

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PhysicsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const runnerActiveRef = useRef(false);
  const spawnTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const themeColorsRef = useRef({
    strokeColor: "rgba(255,255,255,0.8)",
    textColor: "rgba(255,255,255,0.9)",
    circleFill: "#ffffff",
    circleIconColor: "#000000",
    isDark: true,
  });

  const updateThemeColors = useCallback(() => {
    const isDark = !document.documentElement.classList.contains("light");
    if (isDark !== themeColorsRef.current.isDark) {
      themeColorsRef.current = {
        strokeColor: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
        textColor: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
        circleFill: isDark ? "#ffffff" : "#000000",
        circleIconColor: isDark ? "#000000" : "#ffffff",
        isDark,
      };
    }
  }, []);

  const cleanup = useCallback(() => {
    spawnTimersRef.current.forEach((timer) => clearTimeout(timer));
    spawnTimersRef.current = [];
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
      runnerActiveRef.current = false;
    }
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
    }
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
    }
    runnerRef.current = null;
    renderRef.current = null;
    engineRef.current = null;
  }, []);

  const initPhysics = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner, Composite, Body } = Matter;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width <= 0 || height <= 0) return;

    const scale = width < 640 ? Math.max(0.54, (width - 32) / 510) : 1;

    updateThemeColors();

    const engine = Engine.create({
      gravity: { x: 0, y: 1.5, scale: 0.001 },
    });
    engineRef.current = engine;

    const render = Render.create({
      canvas: canvasRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });
    renderRef.current = render;

    const wallThickness = 60;
    const groundY = height - (60 * scale) / 2;
    const walls = [
      Bodies.rectangle(width / 2, groundY + wallThickness / 2, width + 200, wallThickness, {
        isStatic: true,
        render: { visible: false },
        friction: 0.8,
        restitution: 0.2,
      }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    World.add(engine.world, walls);

    PHYSICS_TAGS.forEach((tag, index) => {
      const timer = setTimeout(() => {
        if (!engineRef.current) return;

        const scaledW = tag.width * scale;
        const scaledH = tag.height * scale;
        const minX = scaledW / 2 + 12;
        const maxX = Math.max(minX, width - scaledW / 2 - 12);
        const x = minX + Math.random() * Math.max(1, maxX - minX);
        const startY = -100 - Math.random() * 260;

        let body;
        if (tag.isCircle) {
          body = Bodies.circle(x, startY, scaledW / 2, {
            restitution: 0.3,
            friction: 0.8,
            frictionAir: 0.01,
            render: {
              fillStyle: "transparent",
              strokeStyle: "transparent",
              lineWidth: 0,
            },
            label: tag.id,
          });
        } else {
          body = Bodies.rectangle(x, startY, scaledW, scaledH, {
            restitution: 0.3,
            friction: 0.8,
            frictionAir: 0.01,
            chamfer: { radius: scaledH / 2 },
            render: {
              fillStyle: "transparent",
              strokeStyle: "transparent",
              lineWidth: 0,
            },
            label: tag.id,
          });
          Body.setInertia(body, body.inertia * 8);
        }

        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.01);
        Composite.add(engineRef.current.world, body);
      }, index * 150 + Math.random() * 100);

      spawnTimersRef.current.push(timer);
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const wheelHandler = (mouse as MatterMouseWithWheel).mousewheel;
    if (wheelHandler) {
      mouse.element.removeEventListener("wheel", wheelHandler);
      mouse.element.removeEventListener("mousewheel", wheelHandler);
      mouse.element.removeEventListener("DOMMouseScroll", wheelHandler);
    }

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    runnerActiveRef.current = true;
    Render.run(render);

    Matter.Events.on(engine, "beforeUpdate", () => {
      const bodies = Composite.allBodies(engine.world);
      bodies.forEach((body) => {
        const tag = PHYSICS_TAGS_MAP.get(body.label);
        if (tag && !body.isStatic) {
          if (tag.isCircle) {
            const numPoints = 5;
            const currentAngle = body.angle % (Math.PI * 2);
            const stableAngles = Array.from({ length: numPoints }, (_, i) =>
              Math.PI / 2 + (i * (Math.PI * 2)) / numPoints
            );

            let nearestAngle = stableAngles[0];
            let minDiff = Math.abs(currentAngle - nearestAngle);

            for (const angle of stableAngles) {
              for (const checkAngle of [angle, angle - Math.PI * 2, angle + Math.PI * 2]) {
                const diff = Math.abs(currentAngle - checkAngle);
                if (diff < minDiff) {
                  minDiff = diff;
                  nearestAngle = checkAngle;
                }
              }
            }

            const angleDiff = nearestAngle - currentAngle;
            body.torque = angleDiff * 0.00003 * body.mass;
          } else {
            body.torque = -body.angle * 0.0005 * body.mass;
            Body.setAngularVelocity(body, body.angularVelocity * 0.95);
          }
        }
      });
    });

    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const bodies = Composite.allBodies(engine.world);

      updateThemeColors();
      const colors = themeColorsRef.current;
      const fontSize = Math.max(13, Math.round(26 * scale));
      const pillFont = `400 ${fontSize}px 'Space Mono', monospace`;
      const circleFont = `bold ${fontSize}px system-ui, sans-serif`;

      bodies.forEach((body) => {
        const tag = PHYSICS_TAGS_MAP.get(body.label);
        if (tag) {
          const w = tag.width * scale;
          const h = tag.height * scale;

          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);

          if (tag.isCircle && tag.icon) {
            ctx.beginPath();
            ctx.arc(0, 0, w / 2, 0, Math.PI * 2);
            ctx.fillStyle = colors.circleFill;
            ctx.fill();

            ctx.font = circleFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = colors.circleIconColor;
            ctx.fillText(tag.icon === "asterisk" ? "✱" : "→", 0, 1);
          } else {
            const radius = h / 2;

            ctx.beginPath();
            ctx.moveTo(-w / 2 + radius, -h / 2);
            ctx.lineTo(w / 2 - radius, -h / 2);
            ctx.arc(w / 2 - radius, 0, radius, -Math.PI / 2, Math.PI / 2);
            ctx.lineTo(-w / 2 + radius, h / 2);
            ctx.arc(-w / 2 + radius, 0, radius, Math.PI / 2, -Math.PI / 2);
            ctx.closePath();

            ctx.strokeStyle = colors.strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.font = pillFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = colors.textColor;
            ctx.fillText(tag.text, 0, 1);
          }

          ctx.restore();
        }
      });
    });
  }, [updateThemeColors]);

  useEffect(() => {
    if (!isClient || reducedMotion) return;

    initPhysics();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cleanup();
        initPhysics();
      }, 250);
    };

    window.addEventListener("resize", debouncedResize);

    const container = containerRef.current;
    const observer =
      typeof IntersectionObserver !== "undefined" && container
        ? new IntersectionObserver(
            ([entry]) => {
              if (!runnerRef.current || !engineRef.current) return;
              if (entry.isIntersecting && !runnerActiveRef.current) {
                Matter.Runner.run(runnerRef.current, engineRef.current);
                runnerActiveRef.current = true;
              } else if (!entry.isIntersecting && runnerActiveRef.current) {
                Matter.Runner.stop(runnerRef.current);
                runnerActiveRef.current = false;
              }
            },
            { threshold: 0.05 }
          )
        : null;

    if (observer && container) {
      observer.observe(container);
    }

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      observer?.disconnect();
      cleanup();
    };
  }, [isClient, reducedMotion, initPhysics, cleanup]);

  if (!isClient || reducedMotion) {
    return (
      <div
        role="region"
        aria-label="Interactive skills showcase"
        className="w-full h-[500px] flex items-center justify-center"
      >
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl px-6">
          {SKILL_PILLS.map((tag) => (
            <span
              key={tag.id}
              className="px-6 py-3 rounded-full border border-foreground/20 text-sm font-medium"
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Interactive skills showcase"
      className="w-full h-[500px] overflow-hidden relative"
    >
      <ul className="sr-only">
        {SKILL_PILLS.map((tag) => (
          <li key={tag.id}>{tag.text}</li>
        ))}
      </ul>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
