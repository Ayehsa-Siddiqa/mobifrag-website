"use server";

import nodemailer from "nodemailer";
import { site } from "@/lib/content";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const TOPICS = ["Fragrances", "Flavours", "Ingredients", "Careers", "Other"];
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
  const from = `"${site.name} Website" <${SMTP_USER}>`;
  const safe = {
    name: escapeHtml(name),
    company: escapeHtml(company || "—"),
    email: escapeHtml(email),
    topic: escapeHtml(topic),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };

  try {
    // 1) Notify Mobifrag
    await transporter.sendMail({
      from,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[${topic}] New enquiry from ${name}`,
      text: `New website enquiry\n\nName: ${name}\nCompany: ${company || "—"}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.6">
          <h2 style="margin:0 0 16px">New website enquiry</h2>
          <table cellpadding="6" style="border-collapse:collapse">
            <tr><td><strong>Name</strong></td><td>${safe.name}</td></tr>
            <tr><td><strong>Company</strong></td><td>${safe.company}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td><strong>Topic</strong></td><td>${safe.topic}</td></tr>
          </table>
          <p style="margin-top:16px"><strong>Message</strong></p>
          <p style="white-space:normal">${safe.message}</p>
        </div>`,
    });

    // 2) Confirmation to the client
    await transporter.sendMail({
      from: `"${site.name}" <${SMTP_USER}>`,
      to: email,
      replyTo: to,
      subject: `We've received your query — ${site.name}`,
      text: `Dear ${name},\n\nThank you for contacting ${site.name}. Your query has been submitted successfully and our team will get back to you shortly.\n\nYour message:\n${message}\n\nKind regards,\nThe ${site.name} Team\n${to}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.6">
          <p>Dear ${safe.name},</p>
          <p>Thank you for contacting <strong>${site.name}</strong>. Your query has been submitted successfully and our team will get back to you shortly.</p>
          <p style="margin-top:20px"><strong>Your message (${safe.topic}):</strong></p>
          <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #999;background:#f6f6f6">${safe.message}</blockquote>
          <p style="margin-top:20px">Kind regards,<br>The ${site.name} Team<br><a href="mailto:${to}">${to}</a></p>
        </div>`,
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
