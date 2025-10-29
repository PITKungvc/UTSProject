"use client"
import React, { useEffect, useState, useRef } from "react";

/**
 * Landing Page – React + Tailwind (v9 - fixed)
 * - Smooth scroll with 60px offset (uses event delegation + closest('a'))
 * - Navbar hidden at top; appears after scroll > 80px
 * - Fade-in sections via IntersectionObserver
 * - All components included in one file to prevent compile errors
 */
export default function LandingPageV9() {
  // Anchor smooth scroll w/ offset 60px
  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (target && target.hash) {
        const el = document.querySelector(target.hash);
        if (el) {
          e.preventDefault();
          const offsetTop = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth">
      <Navbar />
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <ProjectGoal />
      </FadeInSection>
      <FadeInSection>
        <HowItWorks />
      </FadeInSection>
      <FadeInSection>
        <CTA />
      </FadeInSection>
      <FadeInSection>
        <Footer />
      </FadeInSection>
    </div>
  );
}

/* ==========================
 * Navbar (hide at top; reveal on scroll)
 * ========================== */
function Navbar() {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 border-b bg-white/80 backdrop-blur transition-all duration-500 ${
        showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-white">🌱</div>
          <a href="#" className="font-semibold">Smart Food Loop</a>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#goal" className="hover:text-slate-900">Project goal</a>
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#cta" className="hover:text-slate-900">Get started</a>
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <a className="rounded-xl border px-3 py-2 hover:bg-slate-50" href="#donate">Donate</a>
          <a className="rounded-xl border px-3 py-2 hover:bg-slate-50" href="#receiver">Receiver</a>
          <a className="rounded-xl border px-3 py-2 hover:bg-slate-50" href="#login">Login</a>
          <a className="rounded-xl bg-slate-900 px-3 py-2 font-semibold text-white hover:opacity-90" href="#register">Register</a>
        </div>
      </div>
    </header>
  );
}

/* ==========================
 * Hero
 * ========================== */
function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[420px] w-full">
      <img
        src="/Foodwaste.jpg?q=80&w=2000&auto=format&fit=crop"
        alt="Food waste background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5 text-center text-white">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">Smart Food Waste</h1>
        <p className="mt-2 text-3xl font-extrabold md:text-4xl">Recycling Loop</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <SDGChip label="SDG 2 – Zero Hunger" />
          <SDGChip label="SDG 12 – Responsible Consumption" />
          <SDGChip label="SDG 13 – Climate Action" />
          <SDGChip label="SDG 17 – Partnerships" />
        </div>
      </div>
    </div>
  );
}

function SDGChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur-lg transition hover:bg-white/30">
      <span className="h-2 w-2 rounded-full bg-white" />
      {label}
    </span>
  );
}

/* ==========================
 * Project Goal
 * ========================== */
function ProjectGoal() {
  return (
    <section id="goal" className="py-10 md:py-12 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-2xl font-bold tracking-tight">Project goal ↗</h2>
        <p className="mt-2 text-slate-600">
          To create a sustainable food management system that minimises food waste, redistributes edible food to those in
          need, and recycles inedible waste into compost or biofertiliser for community farming.
        </p>
      </div>
    </section>
  );
}

/* ==========================
 * How It Works
 * ========================== */
function HowItWorks() {
  return (
    <section id="how" className="py-8 md:py-12 bg-slate-50 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How this application works 📄</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Simple 5-step process that connects donors, receivers, and volunteers seamlessly.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {stepItems.map((s) => (
            <StepCard key={s.step} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, title, desc, img }: { step: string; title: string; desc: string; img: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm transition hover:shadow-md md:flex-row md:text-left">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-[6px] border-amber-300">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-1">
        <div className="text-sm font-bold text-slate-700">{step}</div>
        <div className="text-base font-semibold leading-snug">{title}</div>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

const stepItems = [
  {
    step: "Step 1",
    title: "Donor and receiver register to application separately",
    desc: "Quick onboarding with role verification.",
    img: "/Register.jpg?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: "Step 2.1",
    title: "Donor inform the amount of the leftover food and food waste separately",
    desc: "Leftover → charity / receivers. Food waste → farmers (compost/biofertiliser).",
    img: "/Deliver.webp?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: "Step 2.2",
    title: "Receiver inform the amount of food they need",
    desc: "Set quantity, dietary tags, timing windows.",
    img: "/Food.png?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Application shows the nearest food bank/charity and the nearest farmer",
    desc: "Smart matching by distance and expiry time.",
    img: "/Location.jpg?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: "Step 4",
    title: "The application sends a notification to volunteers or organizations to deliver the food",
    desc: "Auto-create pick-up runs with route optimisation.",
    img: "/notification.webp?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: "Step 5",
    title: "Receiver gets food and inform the amount of people who get donated",
    desc: "Capture proof-of-delivery & impact metrics.",
    img: "/Fooddeliver.jpg?q=80&w=800&auto=format&fit=crop",
  },
];

/* ==========================
 * CTA
 * ========================== */
function CTA() {
  return (
    <section id="cta" className="scroll-mt-20 py-16 text-center">
      <p className="text-xl font-semibold">“Be the one with us”</p>
      <a
        href="#register"
        className="mt-5 inline-block rounded-lg bg-red-500 px-8 py-4 font-bold text-white shadow hover:bg-red-600"
      >
        Let get started
      </a>
    </section>
  );
}

/* ==========================
 * Footer
 * ========================== */
function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-5">
        <div className="text-sm text-slate-600 md:col-span-2">UTS Project for ODOS student</div>
        <FooterColumn title="Topic" links={["Project goal", "How it works", "Start"]} />
        <FooterColumn title="Topic" links={["Donor", "Receiver", "Volunteer"]} />
        <FooterColumn title="Page" links={["Login", "Register", "Donate Money"]} />
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Smart Food Loop. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">{title}</h4>
      <ul className="space-y-1 text-sm text-slate-600">
        {links.map((l) => (
          <li key={l}>
            <a className="hover:text-slate-900" href="#">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================
 * Fade-in wrapper
 * ========================== */
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}
