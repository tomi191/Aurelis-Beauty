"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Форма за запитване: изпраща през /api/contact (Resend).
 * С honeypot против ботове и задължително съгласие по GDPR.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot: хората не виждат полето, ботовете го попълват
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, consent, website }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
      } | null;
      setStatus(res.ok && data?.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="fade-up rounded-2xl border border-emerald-700/25 bg-emerald-50/80 px-6 py-5 shadow-soft"
      >
        <p className="text-[0.98rem] font-medium text-emerald-900">
          Получихме запитването ви.
        </p>
        <p className="mt-1 text-[0.92rem] text-emerald-900/75">
          Ще се свържем с вас още същия работен ден.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border hairline bg-paper-soft/60 px-5 py-3.5 text-base text-primary-ink placeholder:text-tertiary-ink focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Вашето име
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Име и фамилия"
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Телефон за връзка
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08X XXX XXXX"
            className={field}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
          С какво да ви помогнем?
        </span>
        <textarea
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Например: искам час за почистване на лице другата седмица…"
          className={field}
        />
      </label>

      {/* Honeypot: извън екрана и извън tab реда */}
      <div
        className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Оставете това поле празно
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 size-5 shrink-0 accent-bordeaux"
        />
        <span className="text-[0.85rem] leading-relaxed text-tertiary-ink">
          Съгласен/на съм данните ми (име, телефон) да бъдат използвани само
          за връзка по запитването ми, съгласно{" "}
          <a
            href="/poveritelnost"
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
          >
            политиката за поверителност
          </a>
          .
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-all duration-300 hover:-translate-y-0.5 hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Изпращане…" : "Изпрати запитване"}
        </button>
        <p className="text-[0.82rem] text-tertiary-ink">
          Отговаряме още същия ден в работно време.
        </p>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="fade-up rounded-2xl border border-bordeaux/20 bg-bordeaux/5 px-5 py-3.5 text-[0.9rem] text-bordeaux"
        >
          Нещо се обърка. Обадете се направо на{" "}
          <a
            href={contact.phoneHref}
            className="tnum font-semibold underline decoration-gold/60 underline-offset-2"
          >
            {contact.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}
