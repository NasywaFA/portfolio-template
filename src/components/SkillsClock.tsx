"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Skill {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

const skills: Skill[] = [
  {
    id: "research",
    name: "Research",
    icon: "🔍",
    desc: "Understanding users through interviews, surveys, and data analysis to uncover real needs and pain points.",
  },
  {
    id: "wireframing",
    name: "Wireframing",
    icon: "✏️",
    desc: "Sketching low-fidelity blueprints that define information architecture and user flows.",
  },
  {
    id: "ui-design",
    name: "UI Design",
    icon: "🎨",
    desc: "Creating visually compelling interfaces with attention to typography, color, and hierarchy.",
  },
  {
    id: "prototyping",
    name: "Prototyping",
    icon: "⚡",
    desc: "Building interactive prototypes that bring ideas to life and enable early validation.",
  },
  {
    id: "testing",
    name: "Testing",
    icon: "🧪",
    desc: "Conducting usability tests to validate design decisions and iterate based on real feedback.",
  },
  {
    id: "handoff",
    name: "Handoff",
    icon: "🚀",
    desc: "Delivering clean, developer-ready specs with design tokens, assets, and documentation.",
  },
];

const CX = 160;
const CY = 160;
const R = 134;
const WRAPPER_W = 320;
const WRAPPER_H = 360;
const RETURN_DURATION = 400;

export default function SkillsClock() {
  const [selected, setSelected] = useState<Skill | null>(null);
  const [time, setTime] = useState(new Date());
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    skills.map((_, i) => {
      const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
      return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
    })
  );
  const [returning, setReturning] = useState<string | null>(null);
  const [returnTarget, setReturnTarget] = useState<{ x: number; y: number } | null>(null);

  const rotationRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const positionsRef = useRef(positions);
  const selectedRef = useRef<Skill | null>(null);

  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const loop = useCallback((ts: number) => {
    if (!pausedRef.current) {
      if (lastTsRef.current !== null) {
        rotationRef.current +=
          ((ts - lastTsRef.current) / 1000) * ((2 * Math.PI) / 40);
      }
      lastTsRef.current = ts;
    }
    setTime(new Date());
    setPositions(
      skills.map((_, i) => {
        const baseAngle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
        const angle = baseAngle + rotationRef.current;
        return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
      })
    );
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loop]);

  const deselect = useCallback((skillId: string) => {
    const idx = skills.findIndex((s) => s.id === skillId);
    const target = positionsRef.current[idx];
    setReturnTarget(target);
    setReturning(skillId);
    setSelected(null);
    pausedRef.current = false;
    lastTsRef.current = null;
    setTimeout(() => {
      setReturning(null);
      setReturnTarget(null);
    }, RETURN_DURATION);
  }, []);

  // Click anywhere to deselect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const current = selectedRef.current;
      if (!current) return;
      // If the click target is a skill button, let the button's own handler deal with it
      const target = e.target as HTMLElement;
      if (target.closest("[data-skill-btn]")) return;
      deselect(current.id);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [deselect]);

  const handleSkillClick = (skill: Skill) => {
    if (selected?.id === skill.id) {
      deselect(skill.id);
    } else {
      setReturning(null);
      setReturnTarget(null);
      setSelected(skill);
      pausedRef.current = true;
    }
  };

  const s = time.getSeconds() + time.getMilliseconds() / 1000;
  const m = time.getMinutes() + s / 60;
  const h = (time.getHours() % 12) + m / 60;
  const secDeg = (s / 60) * 360;
  const minDeg = (m / 60) * 360;
  const hourDeg = (h / 12) * 360;
  const timeLabel = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const handBottom = WRAPPER_H - CY;

  return (
    <section className="flex flex-col items-center py-16 px-4">
      <h2 className="text-2xl font-medium text-center mb-1.5">The UX Journey</h2>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-10 leading-relaxed">
        A continuous cycle of discovery, creation, and refinement — each skill
        orbiting like hours on a clock.
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-12 flex-wrap justify-center">
        {/* Clock */}
        <div
          className="relative flex-shrink-0"
          style={{ width: WRAPPER_W, height: WRAPPER_H }}
        >
          <div
            className="absolute rounded-full bg-secondary border border-border"
            style={{ top: 26, left: 26, right: 26, height: 268 }}
          />
          <div
            className="absolute left-1/2 w-1 rounded-full bg-foreground origin-bottom"
            style={{ height: 64, marginLeft: -2, bottom: handBottom, transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
          />
          <div
            className="absolute left-1/2 rounded-full bg-muted-foreground origin-bottom"
            style={{ width: 2, height: 88, marginLeft: -1, bottom: handBottom, transform: `translateX(-50%) rotate(${minDeg}deg)` }}
          />
          <div
            className="absolute left-1/2 rounded-full origin-bottom"
            style={{ width: 1.5, height: 96, marginLeft: -0.75, bottom: handBottom, background: "#e24b4a", transform: `translateX(-50%) rotate(${secDeg}deg)` }}
          />
          <div
            className="absolute rounded-full bg-foreground z-20"
            style={{ width: 12, height: 12, top: CY - 6, left: CX - 6 }}
          />

          {skills.map((skill, i) => {
            const isSelected = selected?.id === skill.id;
            const isReturning = returning === skill.id;
            const isFaded = !!selected && !isSelected;

            let top: number;
            let left: number;
            let useTransition: boolean;

            if (isSelected) {
              top = CY - 26; left = CX - 26; useTransition = true;
            } else if (isReturning && returnTarget) {
              top = returnTarget.y - 26; left = returnTarget.x - 26; useTransition = true;
            } else {
              top = positions[i].y - 26; left = positions[i].x - 26; useTransition = false;
            }

            return (
              <button
                key={skill.id}
                data-skill-btn
                onClick={() => handleSkillClick(skill)}
                className={[
                  "absolute flex items-center justify-center rounded-full text-2xl",
                  "bg-background border focus:outline-none hover:border-foreground/40",
                  isSelected
                    ? "border-foreground/60 ring-2 ring-blue-500/30 scale-125 z-30"
                    : "border-border z-10",
                  isFaded ? "opacity-20" : "opacity-100",
                ].join(" ")}
                style={{
                  width: 52,
                  height: 52,
                  top,
                  left,
                  transition: useTransition
                    ? `top ${RETURN_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1), left ${RETURN_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 300ms ease-out, opacity 250ms`
                    : "opacity 250ms",
                }}
                aria-label={skill.name}
              >
                {skill.icon}
              </button>
            );
          })}

          <div
            className="absolute left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-mono"
            style={{ top: CY + 16 }}
          >
            {timeLabel}
          </div>
        </div>

        {/* Info panel */}
        <div className="max-w-xs min-h-40">
          {selected ? (
            <div className="bg-secondary border border-border rounded-xl p-5">
              <div className="text-3xl mb-2">{selected.icon}</div>
              <h3 className="text-lg font-medium mb-2">{selected.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.desc}</p>
              <button
                data-skill-btn
                onClick={() => handleSkillClick(selected)}
                className="mt-4 text-sm text-blue-500 hover:opacity-75 transition-opacity"
              >
                Resume orbit →
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              Click on a skill bubble to learn more about each phase of the design process.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}