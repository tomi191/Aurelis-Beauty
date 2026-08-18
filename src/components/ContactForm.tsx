"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/data";

/**
 * Форма за запитване. До свързването на имейл услугата (Resend, при deploy)
 * формата съставя писмото и го отваря в имейл програмата на клиента —
 * реално работещо поведение, без фалшив „изпратено" екран.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = `Запитване от сайта: ${name}`;
    const body = `${message}\n\n${name}\nТелефон: ${phone}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-2xl border hairline bg-paper-soft/60 px-5 py-3.5 text-[0.95rem] text-primary-ink placeholder:text-tertiary-ink focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] text-tertiary-ink">
            Вашето име
          </span>
          <input
            type="text"
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
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Например: искам час за почистване на лице другата седмица…"
          className={field}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-all duration-300 hover:-translate-y-0.5 hover:bg-wine"
        >
          Изпрати запитване
        </button>
        <p className="text-[0.82rem] text-tertiary-ink">
          Отговаряме още същия ден в работно време.
        </p>
      </div>
    </form>
  );
}
