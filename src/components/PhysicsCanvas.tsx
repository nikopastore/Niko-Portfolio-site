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

  const createPill = useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      label: string,
      chamferRadius: number
    ) => {
      const body = Matter.Bodies.rectangle(x, y, width, height, {
        chamfer: { radius: chamferRadius },
        restitution: 0.5,
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

    // Engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 },
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

    // Walls
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions),
      Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions),
      Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions),
    ];
    Matter.Composite.add(engine.world, walls);

    // Pills
    bodiesRef.current = SKILL_TAGS.map((label, index) => {
      const pillWidth = Math.max(140, label.length * 11 + 48);
      const pillHeight = 44;
      const chamferRadius = 22;
      const x = Math.random() * (width - pillWidth - 100) + pillWidth / 2 + 50;
      const y = -60 - index * 70;
      return createPill(x, y, pillWidth, pillHeight, label, chamferRadius);
    });
    Matter.Composite.add(engine.world, bodiesRef.current);

    // Mouse Control
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

    // Custom Rendering for Pills with Labels
    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;
      const isDark = !document.documentElement.classList.contains("light");

      bodiesRef.current.forEach((body) => {
        const { position, angle, bounds } = body;
        const label = body.label;
        const pillWidth = bounds.max.x - bounds.min.x;
        const pillHeight = bounds.max.y - bounds.min.y;
        const radius = pillHeight / 2;

        context.save();
        context.translate(position.x, position.y);
        context.rotate(angle);

        // Draw pill background
        context.beginPath();
        context.roundRect(
          -pillWidth / 2,
          -pillHeight / 2,
          pillWidth,
          pillHeight,
          radius
        );
        context.fillStyle = isDark ? "#1a1a1a" : "#f5f5f5";
        context.fill();
        context.strokeStyle = isDark ? "#333333" : "#cccccc";
        context.lineWidth = 1.5;
        context.stroke();

        // Draw label
        context.fillStyle = isDark ? "#ffffff" : "#0f0f0f";
        context.font = "500 14px 'Space Grotesk', system-ui, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(label, 0, 1);

        context.restore();
      });
    });

    // Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);
  }, [createPill]);

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

  // SSR fallback
  if (!isClient) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="flex flex-wrap gap-3 justify-center max-w-3xl px-6">
          {SKILL_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-5 py-2.5 rounded-full border border-card-border bg-card text-sm font-medium"
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
