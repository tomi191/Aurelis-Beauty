import { NextResponse } from "next/server";
import { contact } from "@/lib/data";

/**
 * Приема запитването от контактната форма и го праща като имейл
 * през Resend REST API. Без библиотека: един fetch е достатъчен.
 */

/** Екраниране на потребителски вход преди вмъкване в HTML на писмото. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "bad-request" },
      { status: 400 }
    );
  }

  const { name, phone, message, consent, website } = (body ?? {}) as Record<
    string,
    unknown
  >;

  // Honeypot: полето е невидимо за хора; попълнено → бот, отговаряме
  // „успешно", без да изпращаме нищо, за да не се издаваме.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string" ||
    consent !== true
  ) {
    return NextResponse.json(
      { ok: false, reason: "validation" },
      { status: 400 }
    );
  }

  const cleanName = name.trim();
  const cleanPhone = phone.trim();
  const cleanMessage = message.trim();
  const phoneDigits = cleanPhone.replace(/\D/g, "");

  if (
    cleanName.length < 2 ||
    cleanName.length > 100 ||
    phoneDigits.length < 6 ||
    cleanMessage.length < 5 ||
    cleanMessage.length > 2000
  ) {
    return NextResponse.json(
      { ok: false, reason: "validation" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY липсва: запитване от " + cleanName + " не е изпратено."
    );
    return NextResponse.json(
      { ok: false, reason: "no-email-service" },
      { status: 503 }
    );
  }

  const html = [
    "<h2>Ново запитване от сайта</h2>",
    `<p><strong>Име:</strong> ${escapeHtml(cleanName)}</p>`,
    `<p><strong>Телефон:</strong> ${escapeHtml(cleanPhone)}</p>`,
    "<p><strong>Съобщение:</strong></p>",
    `<p>${escapeHtml(cleanMessage).replace(/\n/g, "<br />")}</p>`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // При верифициран собствен домейн в Resend: "AURELIS <kontakt@домейна>"
        from: "AURELIS <onboarding@resend.dev>",
        to: [contact.email],
        subject: `Запитване от сайта: ${cleanName}`,
        html,
        text: `Име: ${cleanName}\nТелефон: ${cleanPhone}\n\n${cleanMessage}`,
      }),
    });

    if (!res.ok) {
      console.error("Resend върна статус " + res.status);
      return NextResponse.json(
        { ok: false, reason: "email-failed" },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, reason: "email-failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
