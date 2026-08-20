"use client";

import { useState, type FormEvent } from "react";
import { categories, contact } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

const SERVICE_OPTIONS = [
  "Консултация и анализ",
  ...categories.map((c) => c.name),
  "Лазерна епилация",
  "Друго",
];

const TIME_OPTIONS = [
  "Без значение",
  "Сутрин 08–12",
  "Обед 12–16",
  "Следобед 16–20",
];

/** "2026-08-21" → "21.08.2026" за четимост в писмото. */
function formatDateBg(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

/**
 * Форма за запитване: изпраща през /api/contact (Resend).
 * С honeypot против ботове и задължително съгласие по GDPR.
 * Услуга/ден/час/имейл се сгъват в message: API договорът остава
 * name/phone/message/consent/website.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState(TIME_OPTIONS[0]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot: хората не виждат полето, ботовете го попълват
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const details = [
      service ? `Услуга: ${service}` : null,
      preferredDate ? `Предпочитан ден: ${formatDateBg(preferredDate)}` : null,
      preferredTime !== "Без значение"
        ? `Предпочитан час: ${preferredTime}`
        : null,
      email.trim() ? `Имейл: ${email.trim()}` : null,
    ].filter(Boolean);
    const fullMessage = details.length
      ? `${message}\n\n${details.join("\n")}`
      : message;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: fullMessage,
          consent,
          website,
        }),
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
          Отговаряме до края на работния ден.
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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Услуга
          </span>
          <select
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={field}
          >
            <option value="">Изберете услуга (по желание)</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Имейл (по желание)
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ime@primer.bg"
            className={field}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Предпочитан ден (по желание)
          </span>
          <input
            type="date"
            name="preferredDate"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Предпочитан час
          </span>
          <select
            name="preferredTime"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className={field}
          >
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
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
          Съгласен/на съм данните ми (име, телефон, имейл) да бъдат използвани само
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
          Отговаряме до края на работния ден.
        </p>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="fade-up rounded-2xl border border-bordeaux/20 bg-bordeaux/5 px-5 py-3.5 text-[0.9rem] text-bordeaux"
        >
          Съобщението не се изпрати. Обадете се направо на{" "}
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
