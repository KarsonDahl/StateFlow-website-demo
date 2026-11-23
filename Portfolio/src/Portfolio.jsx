import { useState, useEffect, useRef, useCallback } from "react";

// ─── COLOR TOKENS ───────────────────────────────────────────
const C = {

  bg: "#0d1210",
  cardBg: "rgba(34,60,46,0.35)",
  cardBorder: "rgba(120,180,140,0.18)",
  cardBorderHov: "rgba(120,180,140,0.42)",
  cardBgHov: "rgba(34,60,46,0.6)",
  accent: "#7ab892",
  accentDim: "rgba(122,184,146,0.25)",
  accentGlow: "rgba(122,184,146,0.15)",
  text: "#c8d5c8",
  textMuted: "#7a9080",
  textLight: "#eef2ee",
  white: "#f0f4f0",
};

// ─── DATA ───────────────────────────────────────────────────
const SKILLS = [
  { category: "Languages & Frameworks", items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Svelte", "Python", "C++", "C#", "HTML/CSS", "SQL"] },
  { category: "AI & APIs", items: ["LLM API Integration", "Prompt Engineering", "RESTful API Design", "JSON", "Authentication"] },
  { category: "Cloud, DevOps & Databases", items: ["Docker", "CI/CD Pipelines", "Vercel Serverless", "Git/GitHub", "MySQL", "SQL Server"] },
  { category: "Systems & Security", items: ["Linux", "Windows Server", "VMware/VirtualBox/vSphere", "Wireshark", "Cisco Packet Tracer", "Firewall Configuration"] },
];

const EXPERIENCE = [
  {
    title: "Software Development Intern",
    company: "Select Medical · Mechanicsburg, PA",
    date: "May 2026 – Aug 2026",
    detail: "Delivered full-stack features for enterprise healthcare applications using TypeScript, React, C#, and SQL. Built and consumed REST APIs, resolved defects through root-cause analysis, and applied secure coding and CI/CD practices.",
  },
  {
    // TODO: confirm exact title (e.g. "Freelance Software Developer"), and add scope/tech. Not on the 9/26 resume.
    title: "Freelance Developer",
    company: "Self-employed",
    date: "May 2025 – Present",
    detail: "[TODO: add 1–2 sentences on freelance work — types of projects and technologies. No client names unless approved.]",
  },
  {
    title: "Software Engineering Intern",
    company: "SIL Language Software · Remote",
    date: "May 2025 – Aug 2025",
    detail: "Migrated progressive web app components from Svelte 4 to Svelte 5, and resolved bugs and hardened front-end and back-end code in an Agile team using GitHub and remote stand-ups.",
  },
  {
    title: "Resident Advisor & Peer Mentor",
    company: "Liberty University",
    date: "2025 – Present",
    detail: "Selected to manage a residential floor of 40+ students; supervised and developed 5 junior peer mentors.",
  },
];

const PROJECTS = [
  {
    name: "Scriptoria",
    // TODO: add one-line description of what Scriptoria does, repo/demo URLs (if public), and tech stack.
    desc: "Senior capstone project built for Wycliffe by a team of 5, where I lead architecture and front-end. [TODO: what Scriptoria does]",
    tags: ["Capstone", "Architecture", "Front-End"],
    url: null, // TODO: repo URL, if public
  },
  {
    name: "WaterDetect",
    // TODO: confirm tech stack (tags), EMRC expansion/wording, and whether the project can be described further.
    desc: "Offline-first Android app for four-electrode ground resistivity surveys, built for EMRC.",
    tags: ["Android", "Offline-First", "Resistivity Surveys"],
    url: "https://github.com/KarsonDahl/WaterDetectEMRC",
    links: [
      { label: "GitHub", url: "https://github.com/KarsonDahl/WaterDetectEMRC" },
      { label: "Live demo", url: "https://water-detection-delta.vercel.app/" },
    ],
  },
  // Updated to match resume (9/26). TODO: confirm which LLM provider, if you want it named.
  { name: "StateFlow", tags: ["Node.js", "REST APIs", "Generative AI", "Vercel"], desc: "Full-stack social content platform with AI-curated topic generation, category-based filtering, and a live comment system. Integrates a third-party LLM API end-to-end and deploys serverlessly on Vercel with CI/CD.", url: "https://stateflowdemo.vercel.app/" },
  { name: "C++ Learning Projects", tags: ["C++", "Algorithms"], desc: "A growing collection of C++ programs covering core language concepts and problem solving.", url: "https://github.com/KarsonDahl/CPlusPlus-Learning-Projects" },
  { name: "DSA Learning Projects", tags: ["C++", "Data Structures"], desc: "All content completed in Data Structures & Algorithms — sorting, graphs, trees, and more.", url: "https://github.com/KarsonDahl/DSA-Learning-Projects" },
  { name: "Goatscaping Co", tags: ["HTML", "CSS", "JavaScript"], desc: "A full multi-page website built for a landscaping company — navigation, forms, and responsive layout.", url: "https://github.com/KarsonDahl/GoatscapingCo" },
  { name: "AppBuilder PWA", tags: ["TypeScript", "Svelte", "PWA"], desc: "Forked Progressive Web App template for Scripture App Builder — real-world open source contribution.", url: "https://github.com/sillsdev/appbuilder-pwa" },
];

// ─── SIMPLE NOISE (value noise with smooth interpolation) ───
function smoothNoise() {
  const perm = Array.from({ length: 512 }, () => Math.floor(Math.random() * 256));
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + t * (b - a); }
  function grad(hash, x, y) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
  return function noise(x, y) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = fade(x), v = fade(y);
    const aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
    return lerp(lerp(grad(aa, x, y), grad(ba, x - 1, y), u), lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u), v);
  };
}
const noise = smoothNoise();

// ─── LEAF BURST ON CLICK ────────────────────────────────────
function LeafBurst({ leaves, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 100);
    return () => clearTimeout(t);
  }, [onDone]);
  return leaves.map((l, i) => (
    <div key={i} style={{
      position: "fixed", left: l.x, top: l.y, width: "8px", height: "12px",
      background: `hsl(${130 + Math.random() * 30}, 55%, ${35 + Math.random() * 15}%)`,
      borderRadius: "50% 50% 50% 0",
      transform: `rotate(${l.angle}deg)`,
      pointerEvents: "none", zIndex: 9999,
      animation: `leafFly 0.8s cubic-bezier(0.2,0.8,0.3,1) forwards`,
      "--tx": `${l.vx * 60}px`, "--ty": `${l.vy * 60}px`,
    }} />
  ));
}

// ─── CUSTOM TREE CURSOR ─────────────────────────────────────
function TreeCursor({ pos }) {
  return (

    <div
      style={{
        position: "fixed",
        top: -8,
        left: -10,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        pointerEvents: "none",
        zIndex: 10000,
        willChange: "transform",
      }}
    >
      <svg
        width="45"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",

          // 🔑 Hotspot alignment: tip of cursor
          transform: "translate(-2px, -2px)",
        }}
      >
        <path
          d="M8.68602 16.288L8.10556 9.37387C7.96399 7.68752 9.85032 6.59846 11.24 7.56424L16.9375 11.524C18.6256 12.6972 17.6579 15.348 15.611 15.1577L14.8273 15.0849C13.9821 15.0063 13.1795 15.4697 12.825 16.2409L12.4962 16.9561C11.6376 18.8238 8.858 18.3365 8.68602 16.288Z"
          stroke="#7ab892"          // theme color
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── PARTICLE BACKGROUND (noise-driven drift) ──────────────
function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
    r: Math.random() * 2.8 + 0.5,
    alpha: Math.random() * 0.5 + 0.12,
    noiseOffX: Math.random() * 100,
    noiseOffY: Math.random() * 100,
  };
}

function InteractiveBackground({ mousePos }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const tRef = useRef(0);

  // Hard reset page chrome


  useEffect(() => {
    Object.assign(document.body.style, {
      margin: "0",
      padding: "0",
      overflowX: "hidden",
      overflowY: "auto",
      background: "#0d1210",
    });
  }, []);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let cssW, cssH;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      cssW = window.innerWidth;
      cssH = window.innerHeight;

      // drawing buffer
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;

      // visual size (explicit viewport sizing)
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particlesRef.current = Array.from(
        { length: 80 },
        () => createParticle(cssW, cssH)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, cssW, cssH);

      const mp = mousePosRef.current;
      const particles = particlesRef.current;

      tRef.current += 0.005;
      const t = tRef.current;

      for (const p of particles) {
        const nx = noise(p.noiseOffX + t, p.noiseOffY) * 1;
        const ny = noise(p.noiseOffY + t, p.noiseOffX + 50) * 1;

        p.vx += (nx - p.vx) * 0.02;
        p.vy += (ny - p.vy) * 0.02;

        // mouse repulsion
        const dx = p.x - mp.x;
        const dy = p.y - mp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -10) p.x = cssW + 10;
        if (p.x > cssW + 10) p.x = -10;
        if (p.y < -10) p.y = cssH + 10;
        if (p.y > cssH + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(122,184,146,${p.alpha})`;
        ctx.fill();
      }

      // mouse glow
      if (mp.x > 0) {
        const grad = ctx.createRadialGradient(mp.x, mp.y, 0, mp.x, mp.y, 70);
        grad.addColorStop(0, "rgba(122,184,146,0.08)");
        grad.addColorStop(1, "rgba(122,184,146,0)");

        ctx.beginPath();
        ctx.arc(mp.x, mp.y, 70, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,          // pins all edges
        width: "100vw",    // explicit viewport sizing
        height: "100vh",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}


// ─── TILT CARD WRAPPER ──────────────────────────────────────
function TiltCard({ children, style }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -8, y: x * 8 });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 ? 1.03 : 1})`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.4s cubic-bezier(0.4,0,0.2,1)" : "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

// ─── MAGNETIC BUTTON ────────────────────────────────────────
function GlowButton({ children, href, target, style }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(null);
  const btnRef = useRef(null);

  const handleMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setOffset({ x, y });
  };
  const handleLeave = () => { setOffset({ x: 0, y: 0 }); setHovered(false); };
  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target={target}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "11px 24px",
        background: hovered ? C.accentDim : "rgba(122,184,146,0.07)",
        border: `1px solid rgba(122,184,146,${hovered ? 0.55 : 0.25})`,
        borderRadius: "30px", color: C.accent, textDecoration: "none",
        fontSize: "0.88rem", fontFamily: "'Inter', sans-serif", fontWeight: 500,
        cursor: "none", position: "relative", overflow: "hidden",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered ? `0 0 22px ${C.accentGlow}` : "none",
        transform: `translate(${offset.x}px, ${offset.y}px) translateY(${hovered ? -2 : 0}px)`,
        ...style,
      }}
    >
      {ripple && (
        <span style={{
          position: "absolute", left: ripple.x, top: ripple.y,
          width: "0", height: "0", borderRadius: "50%",
          background: "rgba(122,184,146,0.35)",
          transform: "translate(-50%,-50%)",
          animation: "rippleOut 0.6s ease-out forwards",
        }} />
      )}
      {children}
    </a>
  );
}

// ─── SKILL TAG (bounce on hover) ────────────────────────────
function SkillTag({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block", padding: "5px 16px", borderRadius: "20px",
        fontSize: "0.82rem", fontFamily: "'Inter', sans-serif", fontWeight: 500,
        background: hov ? C.accentDim : "rgba(122,184,146,0.07)",
        border: `1px solid rgba(122,184,146,${hov ? 0.45 : 0.18})`,
        color: hov ? C.accent : C.textMuted,
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hov ? "translateY(-4px) scale(1.08)" : "none",
        boxShadow: hov ? `0 6px 16px rgba(0,0,0,0.25), 0 0 12px ${C.accentGlow}` : "none",
        cursor: "none",
      }}
    >
      {label}
    </span>
  );
}

// ─── SCROLL FADE ────────────────────────────────────────────
function Section({ children, id, style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
      ...style,
    }}>
      {children}
    </section>
  );
}

// ─── EXPERIENCE ITEM (expandable) ──────────────────────────
function ExperienceItem({ exp, isLast }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ marginBottom: isLast ? 0 : "34px", position: "relative", cursor: "none" }}
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* timeline dot */}
      <div style={{
        width: hov ? "14px" : "10px", height: hov ? "14px" : "10px", borderRadius: "50%",
        background: C.accent, boxShadow: hov ? `0 0 14px ${C.accentDim}` : `0 0 8px ${C.accentGlow}`,
        position: "absolute", left: hov ? "-35px" : "-33px", top: "7px",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
        <p style={{ margin: 0, fontSize: "1.05rem", color: hov ? C.accent : C.textLight, fontWeight: 600, transition: "color 0.3s" }}>{exp.title}</p>
        <p style={{ margin: 0, fontSize: "0.76rem", color: C.accent, fontWeight: 500 }}>{exp.date}</p>
      </div>
      <p style={{ margin: "3px 0 4px", fontSize: "0.82rem", color: C.textMuted }}>{exp.company}</p>
      {/* expandable detail */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "120px" : "0",
        opacity: open ? 1 : 0,
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        marginTop: open ? "6px" : "0",
      }}>
        <p style={{ margin: 0, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.65 }}>{exp.detail}</p>
      </div>
      {/* toggle hint */}
      <p style={{ margin: "4px 0 0", fontSize: "0.7rem", color: "rgba(122,184,146,0.45)", fontStyle: "italic", transition: "color 0.3s", userSelect: "none" }}>
        {open ? "Click to collapse ▲" : "Click to expand ▼"}
      </p>
    </div>
  );
}

// ─── PROJECT CARD (tilt + glow) ─────────────────────────────
function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <TiltCard style={{
      background: hov ? C.cardBgHov : C.cardBg,
      border: `1px solid ${hov ? C.cardBorderHov : C.cardBorder}`,
      borderRadius: "14px", padding: "26px 24px",
      boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(122,184,146,0.08)" : "none",
      display: "flex", flexDirection: "column", gap: "10px", textAlign: "left",
      transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
    }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <p style={{ margin: 0, fontSize: "1.02rem", color: C.textLight, fontWeight: 600 }}>{project.name}</p>
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: C.accent, opacity: hov ? 1 : 0.35, transition: "opacity 0.3s, transform 0.3s", transform: hov ? "translate(2px,-2px)" : "none", cursor: "none", display: "inline-block" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        )}
      </div>
      <p style={{ margin: 0, fontSize: "0.85rem", color: C.textMuted, lineHeight: 1.65 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
        {project.tags.map((t) => (
          <span key={t} style={{
            fontSize: "0.72rem", padding: "3px 11px", borderRadius: "12px",
            background: "rgba(122,184,146,0.09)", color: C.accent,
            fontFamily: "'Inter', sans-serif", fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>
      {project.links && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "2px" }}>
          {project.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: C.accent, textDecoration: "none", fontWeight: 500, cursor: "none" }}>{l.label} ↗</a>
          ))}
        </div>
      )}
    </TiltCard>
  );
}

// ─── ABOUT CARD (tilt) ──────────────────────────────────────
function AboutCard({ label, val, sub, extra }) {
  return (
    <TiltCard style={{
      background: C.cardBg, border: `1px solid ${C.cardBorder}`,
      borderRadius: "14px", padding: "24px 20px", textAlign: "left",
      transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
    }}>
      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "2px", color: C.accent, margin: "0 0 10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: "0.97rem", color: C.textLight, margin: "0 0 5px", fontWeight: 600 }}>{val}</p>
      <p style={{ fontSize: "0.8rem", color: C.textMuted, margin: 0, lineHeight: 1.55 }}>{sub}</p>
      {extra && <p style={{ fontSize: "0.78rem", color: C.accent, margin: "6px 0 0", fontWeight: 500 }}>{extra}</p>}
    </TiltCard>
  );
}

// ─── MAIN ───────────────────────────────────────────────────
export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [leaves, setLeaves] = useState([]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // click → leaf burst
  const handleClick = useCallback((e) => {
    const burst = Array.from({ length: 10 }, (_, i) => ({
      x: e.clientX, y: e.clientY,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3 - 1,
      angle: Math.random() * 360,
    }));
    setLeaves(burst);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  const wrap = { position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto", padding: "0 24px", textAlign: "center" };
  const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2.5px", color: C.accent, marginBottom: "10px" };
  const titleStyle = { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem, 3.8vw, 2.5rem)", fontWeight: 700, color: C.white, margin: "0 0 28px 0", lineHeight: 1.25 };

  const LinkedInIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
  const GitHubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
  const EmailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden", cursor: "none" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 5000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        background: "rgba(13,18,16,0.8)", backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${C.cardBorder}`,
      }}>
        <img src="/tree.png" alt="Logo" style={{ height: "32px", width: "auto" }} />
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#about" style={{ color: C.accent, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, cursor: "none" }}>About</a>
          <a href="#skills" style={{ color: C.accent, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, cursor: "none" }}>Skills</a>
          <a href="#projects" style={{ color: C.accent, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, cursor: "none" }}>Projects</a>
          <a href="#contact" style={{ color: C.accent, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, cursor: "none" }}>Contact</a>
        </div>
      </nav>

      {/* Keyframes */}
      <style>{`
        @keyframes leafFly {
          0% { transform: rotate(var(--rot, 0deg)) translate(0,0) scale(1); opacity: 1; }
          100% { transform: rotate(calc(var(--rot, 0deg) + 360deg)) translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes ringPulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%,-50%) scale(1.3); opacity: 0.2; }
        }
        @keyframes rippleOut {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 200px; height: 200px; opacity: 0; }
        }
      `}</style>

      <InteractiveBackground mousePos={mousePos} />
      <TreeCursor pos={mousePos} />
      {leaves.length > 0 && <LeafBurst leaves={leaves} onDone={() => setLeaves([])} />}

      {/* ── HERO ── */}
      <header style={{ ...wrap, paddingTop: "clamp(140px, 20vh, 200px)", paddingBottom: "70px" }}>
        <p style={{ ...labelStyle, marginBottom: "18px" }}>Welcome</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 7.5vw, 5.8rem)",
          fontWeight: 700, color: C.white, margin: 0, lineHeight: 1.05,
        }}>
          Karson Dahl
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.15rem)", fontWeight: 500, color: C.accent, margin: "16px 0 0", letterSpacing: "0.5px" }}>
          Software Engineering · Liberty University '27
        </p>
        <p style={{ fontSize: "0.93rem", color: C.textMuted, maxWidth: "460px", margin: "18px auto 0", lineHeight: 1.8 }}>
          Passionate about building robust applications and solving complex problems. Based in Lynchburg, VA — originally from Bellingham, WA.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "36px", flexWrap: "wrap" }}>
          <GlowButton href="https://www.linkedin.com/in/karson-dahl-luswe/" target="_blank"><LinkedInIcon /> LinkedIn</GlowButton>
          <GlowButton href="https://github.com/KarsonDahl" target="_blank"><GitHubIcon /> GitHub</GlowButton>
          <GlowButton href="mailto:karsondahl17@gmail.com"><EmailIcon /> Email</GlowButton>
        </div>
      </header>

      {/* ── ABOUT ── */}
      <Section id="about" style={{ ...wrap, paddingBottom: "74px" }}>
        <p style={labelStyle}>About</p>
        <h2 style={titleStyle}>A Little About Me</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
          {[
            // TODO: GPA updated 3.61 -> 3.48 per 9/26 resume; "Dean's List" removed (not on resume) — restore if still accurate.
            { label: "Education", val: "B.S. Computer Science", sub: "Software Engineering · Liberty University", extra: "GPA 3.48 · Expected May 2027" },
            { label: "Location", val: "Lynchburg, VA", sub: "Originally from Bellingham, WA", extra: "Willing to relocate" },
            { label: "Focus", val: "Full-Stack & Systems", sub: "Web apps, networking, data systems", extra: null },
          ].map((c) => <AboutCard key={c.label} {...c} />)}
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" style={{ ...wrap, paddingBottom: "74px" }}>
        <p style={labelStyle}>Capabilities</p>
        <h2 style={titleStyle}>Technical Skills</h2>
        {SKILLS.map((group) => (
          <div key={group.category} style={{ marginBottom: "26px" }}>
            <p style={{ fontSize: "0.78rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "1.8px", margin: "0 0 12px", fontWeight: 600 }}>{group.category}</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {group.items.map((s) => <SkillTag key={s} label={s} />)}
            </div>
          </div>
        ))}
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section id="experience" style={{ ...wrap, paddingBottom: "74px" }}>
        <p style={labelStyle}>Career</p>
        <h2 style={titleStyle}>Experience</h2>
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative", paddingLeft: "28px", borderLeft: `1px solid ${C.cardBorder}`, textAlign: "left" }}>
          {EXPERIENCE.map((exp, i) => <ExperienceItem key={i} exp={exp} isLast={i === EXPERIENCE.length - 1} />)}
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects" style={{ ...wrap, paddingBottom: "74px" }}>
        <p style={labelStyle}>Work</p>
        <h2 style={titleStyle}>Projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "14px" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" style={{ ...wrap, paddingBottom: "110px" }}>
        <p style={labelStyle}>Contact</p>
        <h2 style={titleStyle}>Let's Connect</h2>
        <p style={{ fontSize: "0.92rem", color: C.textMuted, maxWidth: "420px", margin: "0 auto 34px", lineHeight: 1.8 }}>
          {/* TODO: confirm target-role wording */}Open to software engineering and solutions architecture roles, collaborations, and interesting projects. I'd love to hear from you.
        </p>
        <GlowButton href="mailto:karsondahl17@gmail.com" style={{ padding: "13px 34px", fontSize: "0.93rem" }}>
          <EmailIcon /> Get In Touch
        </GlowButton>
      </Section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "0 0 44px", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.74rem", color: "#3d5548", margin: 0 }}>© 2026 Karson Dahl · Built with React</p>
      </footer>
    </div>
  );
}
