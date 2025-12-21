"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

interface PhysicsTag {
  id: string;
  text: string;
  width: number;
  height: number;
  isCircle?: boolean;
  icon?: string;
}

// Consolidated skill tags - widths sized to fit 32px Space Mono with letter-spacing
const PHYSICS_TAGS: PhysicsTag[] = [
  { id: "tag-1", text: "DATA ENGINEERING", width: 400, height: 72 },
  { id: "tag-2", text: "GENERATIVE AI", width: 340, height: 72 },
  { id: "tag-3", text: "FULL STACK", width: 270, height: 72 },
  { id: "tag-4", text: "PYTHON", width: 200, height: 72 },
  { id: "tag-5", text: "CLOUD ARCHITECTURE", width: 450, height: 72 },
  { id: "tag-6", text: "REACT / NEXT.JS", width: 360, height: 72 },
  // Decorative circles
  { id: "circle-1", text: "✱", width: 80, height: 80, isCircle: true, icon: "asterisk" },
  { id: "circle-2", text: "→", width: 80, height: 80, isCircle: true, icon: "arrow" },
];

export default function PhysicsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Theme colors - updates based on current theme
  const themeColorsRef = useRef({
    strokeColor: "rgba(255,255,255,0.8)",
    textColor: "rgba(255,255,255,0.9)",
    circleFill: "#ffffff",
    circleIconColor: "#000000",
  });

  // Update colors when theme changes
  const updateThemeColors = useCallback(() => {
    const isDark = !document.documentElement.classList.contains("light");
    themeColorsRef.current = {
      strokeColor: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
      textColor: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
      circleFill: isDark ? "#ffffff" : "#000000",
      circleIconColor: isDark ? "#000000" : "#ffffff",
    };
  }, []);

  const initPhysics = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner, Composite, Body } = Matter;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Update theme colors
    updateThemeColors();

    // Create engine with gentle gravity
    const engine = Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });
    renderRef.current = render;

    // Create boundary walls (invisible)
    const wallThickness = 60;
    // Ground positioned so pills sit flush at visible bottom (accounting for pill height ~72px)
    const groundY = height - 36; // Half of pill height so they sit on the visible edge
    const walls = [
      // Ground - positioned at bottom edge of visible area
      Bodies.rectangle(width / 2, groundY + wallThickness / 2, width + 200, wallThickness, {
        isStatic: true,
        render: { visible: false },
        friction: 0.8,
        restitution: 0.2,
      }),
      // Left wall - flush with edge
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      // Right wall - flush with edge
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    World.add(engine.world, walls);

    // Create physics bodies with staggered drops
    PHYSICS_TAGS.forEach((tag, index) => {
      setTimeout(() => {
        if (!engineRef.current) return;

        const x = 150 + Math.random() * (width - 300);
        const startY = -100 - Math.random() * 300;

        let body;

        if (tag.isCircle) {
          // Circle body
          body = Bodies.circle(x, startY, tag.width / 2, {
            restitution: 0.3,
            friction: 0.8,
            frictionAir: 0.02,
            render: {
              fillStyle: "transparent",
              strokeStyle: "transparent",
              lineWidth: 0,
            },
            label: tag.id,
          });
        } else {
          // Pill-shaped body (rectangle with full chamfer radius)
          body = Bodies.rectangle(x, startY, tag.width, tag.height, {
            restitution: 0.3,
            friction: 0.8,
            frictionAir: 0.02,
            chamfer: { radius: tag.height / 2 }, // Full pill shape
            render: {
              fillStyle: "transparent",
              strokeStyle: "transparent",
              lineWidth: 0,
            },
            label: tag.id,
          });
          // Increase inertia to resist rotation (makes them want to stay upright)
          Body.setInertia(body, body.inertia * 8);
        }

        // Very minimal initial spin (almost none)
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.01);
        Composite.add(engineRef.current.world, body);
      }, index * 150 + Math.random() * 100);
    });

    // Mouse interaction for dragging
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

    // Allow page scrolling over the canvas
    const wheelHandler = (mouse as any).mousewheel;
    if (wheelHandler) {
      mouse.element.removeEventListener("wheel", wheelHandler);
      mouse.element.removeEventListener("mousewheel", wheelHandler);
      mouse.element.removeEventListener("DOMMouseScroll", wheelHandler);
    }

    // Run physics
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Apply restoring torque to keep pills mostly upright
    Matter.Events.on(engine, "beforeUpdate", () => {
      const bodies = Composite.allBodies(engine.world);
      bodies.forEach((body) => {
        const tag = PHYSICS_TAGS.find((t) => t.id === body.label);
        if (tag && !tag.isCircle && !body.isStatic) {
          // Apply a gentle torque to rotate back toward 0 angle
          const torque = -body.angle * 0.0005 * body.mass;
          Body.applyForce(body, body.position, { x: 0, y: 0 });
          body.torque = torque;
          // Also dampen angular velocity
          Body.setAngularVelocity(body, body.angularVelocity * 0.95);
        }
      });
    });

    // Custom rendering for pills and circles
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const bodies = Composite.allBodies(engine.world);

      // Update colors in case theme changed
      updateThemeColors();
      const colors = themeColorsRef.current;

      bodies.forEach((body) => {
        const tag = PHYSICS_TAGS.find((t) => t.id === body.label);
        if (tag) {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);

          if (tag.isCircle && tag.icon) {
            // Solid filled circle with icon
            ctx.beginPath();
            ctx.arc(0, 0, tag.width / 2, 0, Math.PI * 2);
            ctx.fillStyle = colors.circleFill;
            ctx.fill();

            // Icon inside circle
            ctx.font = "bold 32px system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = colors.circleIconColor;
            ctx.fillText(tag.icon === "asterisk" ? "✱" : "→", 0, 1);
          } else {
            // Pill outline (NO FILL, only stroke)
            const w = tag.width;
            const h = tag.height;
            const radius = h / 2;

            // Draw pill path manually for perfect shape
            ctx.beginPath();
            ctx.moveTo(-w / 2 + radius, -h / 2);
            ctx.lineTo(w / 2 - radius, -h / 2);
            ctx.arc(w / 2 - radius, 0, radius, -Math.PI / 2, Math.PI / 2);
            ctx.lineTo(-w / 2 + radius, h / 2);
            ctx.arc(-w / 2 + radius, 0, radius, Math.PI / 2, -Math.PI / 2);
            ctx.closePath();

            // Stroke only - NO fill
            ctx.strokeStyle = colors.strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Text label - larger monospace font with letter-spacing
            ctx.font = "400 32px 'Space Mono', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = colors.textColor;
            // Add letter-spacing by drawing characters individually
            const text = tag.text;
            const letterSpacing = 3;
            const totalWidth = ctx.measureText(text).width + (text.length - 1) * letterSpacing;
            let xPos = -totalWidth / 2;
            for (let i = 0; i < text.length; i++) {
              const char = text[i];
              ctx.fillText(char, xPos + ctx.measureText(char).width / 2, 1);
              xPos += ctx.measureText(char).width + letterSpacing;
            }
          }

          ctx.restore();
        }
      });
    });
  }, [updateThemeColors]);

  const cleanup = useCallback(() => {
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (renderRef.current) Matter.Render.stop(renderRef.current);
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
    }
  }, []);

  const handleResize = useCallback(() => {
    cleanup();
    initPhysics();
  }, [cleanup, initPhysics]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    initPhysics();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      cleanup();
    };
  }, [isClient, initPhysics, cleanup, handleResize]);

  // SSR fallback
  if (!isClient) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl px-6">
          {PHYSICS_TAGS.filter(t => !t.isCircle).map((tag) => (
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
    <div ref={containerRef} className="w-full h-[500px] overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
