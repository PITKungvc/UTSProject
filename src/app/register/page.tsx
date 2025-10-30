"use client";
import React, { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (pw !== pw2) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    // ตรงนี้ในอนาคตคุณจะ fetch("/api/register", { ... })
    alert(
      [
        "REGISTER INFO",
        `Role: ${role}`,
        `Email: ${email}`,
        `Password length: ${pw.length} chars`,
      ].join("\n")
    );

    setError("");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#a8cfa1]">
      {/* simple top bar same vibe as navbar (light) */}
      <header className="w-full border-b border-slate-300/50 bg-white/90 backdrop-blur flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="grid h-11 w-11 place-items-center rounded-md border border-black bg-white text-[10px] font-semibold leading-[1.1]">
            LOGO
          </div>
          <span className="text-sm font-semibold text-slate-800">
            Smart Food Loop
          </span>
        </div>

        <nav className="flex items-center gap-4 text-xs text-slate-800">
          <a href="/#goal" className="hover:underline">
            Project goal
          </a>
          <a href="/#how" className="hover:underline">
            How it works
          </a>
          <a href="/#cta" className="hover:underline">
            Get started
          </a>
          <a
            href="#login"
            className="rounded-md border border-black bg-black px-3 py-1.5 font-medium text-white hover:opacity-90"
          >
            Login
          </a>
        </nav>
      </header>

      {/* center card */}
      <main className="flex flex-1 items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[280px] rounded-md border border-black/10 bg-white/60 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-[2px]"
        >
          <h2 className="text-center text-xl font-semibold text-black">
            Register
          </h2>

          {/* Role */}
          <div className="mt-4 flex flex-col text-[12px] text-black">
            <label className="mb-1 font-medium" htmlFor="role">
              I am a...
            </label>
            <select
              id="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-[3px] border border-slate-500 bg-white px-2 py-2 text-[12px] outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/30"
            >
              <option value="">Select role</option>
              <option value="donor">Donor (I can give food)</option>
              <option value="receiver">Receiver (I need food)</option>
            </select>
          </div>

          {/* Email */}
          <div className="mt-3 flex flex-col text-[12px] text-black">
            <label className="mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[3px] border border-slate-500 bg-white px-2 py-2 text-[12px] outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/30"
              type="email"
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div className="mt-3 flex flex-col text-[12px] text-black">
            <label className="mb-1 font-medium" htmlFor="pw">
              Password
            </label>
            <input
              id="pw"
              required
              minLength={6}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full rounded-[3px] border border-slate-500 bg-white px-2 py-2 text-[12px] outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/30"
              type="password"
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-3 flex flex-col text-[12px] text-black">
            <label className="mb-1 font-medium" htmlFor="pw2">
              Confirm Password
            </label>
            <input
              id="pw2"
              required
              minLength={6}
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="w-full rounded-[3px] border border-slate-500 bg-white px-2 py-2 text-[12px] outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/30"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          {error && (
            <div className="mt-3 rounded bg-red-100 px-2 py-2 text-center text-[11px] font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-[3px] border border-green-700 bg-[#8bff71] px-2 py-2 text-center text-[12px] font-semibold text-black hover:brightness-95"
          >
            REGISTER
          </button>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-800">
            Already have an account?{" "}
            <a
              href="#login"
              className="font-semibold underline underline-offset-2"
            >
              Login
            </a>
          </p>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-[11px] font-medium text-slate-700 underline underline-offset-2 hover:text-black"
            >
              ← Back to Home
            </a>
          </div>
        </form>
      </main>

      <footer className="pb-6 text-center text-[11px] text-white/80">
        Food Rescue Platform · Demo UI
      </footer>
    </div>
  );
}
