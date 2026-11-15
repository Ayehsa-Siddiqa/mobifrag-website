"use server";

import path from "node:path";
import nodemailer from "nodemailer";
import { site } from "@/lib/content";
import { adminEmailHtml, clientEmailHtml, LOGO_CID } from "./email-templates";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const TOPICS = ["Fragrances", "Flavours", "Careers", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip CR/LF so user input can't inject extra email headers.
function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, " ");
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field.
  if (clean(formData.get("website"), 200)) {
    return { status: "success", message: "Thank you — your query has been submitted." };
  }

  const name = oneLine(clean(formData.get("name"), 120));
  const company = oneLine(clean(formData.get("company"), 160));
  const email = oneLine(clean(formData.get("email"), 200));
  const topicRaw = clean(formData.get("topic"), 40);
  const topic = TOPICS.includes(topicRaw) ? topicRaw : "Other";
  const message = clean(formData.get("message"), 5000);

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not set.");
    return { status: "error", message: "Sorry, we couldn't send your message right now. Please email us directly." };
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = process.env.CONTACT_TO || site.email;
  const from = { name: `${site.name} Website`, address: SMTP_USER };
  const safe = {
    name: escapeHtml(name),
    company: escapeHtml(company || "—"),
    email: escapeHtml(email),
    topic: escapeHtml(topic),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };

  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  // Logo embedded inline (cid) so it shows without depending on a public URL.
  const logo = {
    filename: "mobifrag-logo.png",
    path: path.join(process.cwd(), "public", "brand", "logo-light.png"),
    cid: LOGO_CID,
    contentDisposition: "inline" as const,
  };

  try {
    // 1) Notify Mobifrag
    await transporter.sendMail({
      from,
      to,
      replyTo: { name, address: email },
      subject: `[${topic}] New enquiry from ${name}`,
      text: `New website enquiry\n\nName: ${name}\nCompany: ${company || "—"}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}\n`,
      html: adminEmailHtml(safe, siteUrl),
      attachments: [logo],
    });

    // 2) Confirmation to the client
    await transporter.sendMail({
      from: { name: site.name, address: SMTP_USER },
      to: { name, address: email },
      replyTo: to,
      subject: `Thank you for contacting ${site.name}, we've received your enquiry`,
      text:
        `Dear ${name},\n\n` +
        `Thank you for contacting ${site.name}. We've received your enquiry and it is now with our ${topic} team. ` +
        `One of our specialists will get back to you within 1–2 business days.\n\n` +
        `For your records, here is a copy of your message:\n\n${message}\n\n` +
        `If you need to add anything, simply reply to this email.\n\n` +
        `Warm regards,\nThe ${site.name} Team\n${site.tagline}\n${site.address.join(", ")}\n${to}` +
        (siteUrl ? `\n${siteUrl}` : "") +
        "\n",
      html: clientEmailHtml(safe, siteUrl),
      attachments: [logo],
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return { status: "error", message: "Sorry, we couldn't send your message right now. Please try again or email us directly." };
  }

  return {
    status: "success",
    message: "Thank you — your query has been submitted. A confirmation has been sent to your email.",
  };
}
