"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Matter from "matter-js";

const SKILL_TAGS = [
  "Data Engineering",
  "Generative AI",
  "Next.js",
  "Full Stack",
  "Python",
  "LLM Orchestration",
  "TypeScript",
  "PostgreSQL",
  "Cloud Architecture",
];

export default function PhysicsCanvas() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Create a rounded rectangle body (NOT a pill shape)
  const createBox = useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      label: string
    ) => {
      // Use small chamfer radius for subtle rounding (8px), NOT pill shape
      const body = Matter.Bodies.rectangle(x, y, width, height, {
        chamfer: { radius: 8 },
        restitution: 0.4,
        friction: 0.3,
        density: 0.001,
        label: label,
        render: {
          fillStyle: "transparent",
        },
      });
      return body;
    },
    []
  );

  const setup = useCallback(() => {
    if (!sceneRef.current) return;

    const container = sceneRef.current;
    const { clientWidth: width, clientHeight: height } = container;

    // Engine with realistic gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.6 },
    });
    engineRef.current = engine;

    // Renderer
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Walls (invisible boundaries)
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };
    const walls = [
      // Bottom wall
      Matter.Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions),
      // Left wall
      Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions),
      // Right wall
      Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions),
    ];
    Matter.Composite.add(engine.world, walls);

    // Create skill tag boxes (rounded rectangles, NOT pills)
    bodiesRef.current = SKILL_TAGS.map((label, index) => {
      const boxWidth = Math.max(130, label.length * 10 + 40);
      const boxHeight = 40;
      const x = Math.random() * (width - boxWidth - 100) + boxWidth / 2 + 50;
      const y = -50 - index * 60;
      return createBox(x, y, boxWidth, boxHeight, label);
    });
    Matter.Composite.add(engine.world, bodiesRef.current);

    // Mouse/touch interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom rendering for boxes with text labels
    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;
      const isDark = !document.documentElement.classList.contains("light");

      // Akio-matching colors
      const bgColor = isDark ? "#1a1a1a" : "#ffffff";
      const borderColor = isDark ? "#292929" : "#e5e5e5";
      const textColor = isDark ? "#e3e3e1" : "#000000";

      bodiesRef.current.forEach((body) => {
        const { position, angle, bounds } = body;
        const label = body.label;
        const boxWidth = bounds.max.x - bounds.min.x;
        const boxHeight = bounds.max.y - bounds.min.y;

        // Subtle corner radius (8px) - NOT pill shape
        const cornerRadius = 8;

        context.save();
        context.translate(position.x, position.y);
        context.rotate(angle);

        // Draw rounded rectangle background
        context.beginPath();
        context.roundRect(
          -boxWidth / 2,
          -boxHeight / 2,
          boxWidth,
          boxHeight,
          cornerRadius
        );
        context.fillStyle = bgColor;
        context.fill();
        context.strokeStyle = borderColor;
        context.lineWidth = 1;
        context.stroke();

        // Draw text label
        context.fillStyle = textColor;
        context.font = "500 13px 'Space Grotesk', system-ui, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(label, 0, 0);

        context.restore();
      });
    });

    // Run physics simulation
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);
  }, [createBox]);

  const cleanup = useCallback(() => {
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      if (renderRef.current.canvas) {
        renderRef.current.canvas.remove();
      }
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }
    bodiesRef.current = [];
  }, []);

  const handleResize = useCallback(() => {
    cleanup();
    setup();
  }, [cleanup, setup]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    setup();

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
  }, [isClient, setup, cleanup, handleResize]);

  // SSR fallback - show static tags
  if (!isClient) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="flex flex-wrap gap-3 justify-center max-w-3xl px-6">
          {SKILL_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-lg border border-card-border bg-card text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sceneRef}
      className="w-full overflow-hidden relative"
      style={{ height: "500px", touchAction: "none" }}
    />
  );
}
