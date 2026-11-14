import { site } from "@/lib/content";

/** Content ID used to embed the logo inside the email (see actions.ts attachments). */
export const LOGO_CID = "mobifrag-logo";

const c = {
  night: "#23240f",
  henna: "#6b6b33",
  deep: "#4c4d24",
  mist: "#efeee2",
  cream: "#f3efe8",
  ink: "#141414",
  stone: "#8c8a84",
  line: "#e7e1d6",
};

const font = "'Jost','Helvetica Neue',Helvetica,Arial,sans-serif";

export type EnquiryFields = {
  name: string;
  company: string;
  email: string;
  topic: string;
  message: string; // already HTML-escaped, newlines converted to <br>
};

function layout(opts: { preheader: string; body: string; siteUrl?: string }) {
  const year = new Date().getFullYear();
  const link = opts.siteUrl
    ? `<a href="${opts.siteUrl}" style="color:${c.mist};text-decoration:none">${opts.siteUrl.replace(/^https?:\/\//, "")}</a>`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${site.name}</title>
</head>
<body style="margin:0;padding:0;background:${c.cream};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${opts.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.cream}">
  <tr><td align="center" style="padding:32px 12px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${c.line}">
      <tr><td align="center" style="background:${c.night};padding:36px 24px 30px">
        <img src="cid:${LOGO_CID}" width="200" alt="${site.name}" style="display:block;width:200px;max-width:70%;height:auto;border:0;outline:none;color:${c.mist};font-family:${font};font-size:28px;letter-spacing:4px">
      </td></tr>
      <tr><td style="height:4px;background:${c.henna};line-height:4px;font-size:0">&nbsp;</td></tr>
      <tr><td style="padding:40px 40px 32px;font-family:${font};font-size:15px;line-height:1.7;color:${c.ink}">
        ${opts.body}
      </td></tr>
      <tr><td align="center" style="background:${c.night};padding:24px;font-family:${font};font-size:12px;line-height:1.8;color:${c.stone}">
        <div style="color:${c.mist};letter-spacing:3px;text-transform:uppercase;font-size:11px">${site.tagline}</div>
        <div>${site.address.join(", ")}</div>
        <div><a href="mailto:${site.email}" style="color:${c.mist};text-decoration:none">${site.email}</a>${link ? ` &nbsp;·&nbsp; ${link}` : ""}</div>
        <div style="margin-top:8px">© ${year} ${site.name}. All rights reserved.</div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function eyebrow(text: string) {
  return `<div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${c.henna};margin:0 0 8px">${text}</div>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 16px;border-bottom:1px solid ${c.line};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${c.stone};width:110px;vertical-align:top">${label}</td>
    <td style="padding:12px 16px;border-bottom:1px solid ${c.line};font-size:15px;color:${c.ink}">${value}</td>
  </tr>`;
}

function messageBlock(message: string) {
  return `<div style="background:${c.mist};border-left:3px solid ${c.henna};padding:18px 20px;font-size:15px;line-height:1.7;color:${c.ink}">${message}</div>`;
}

/** Email sent to Mobifrag with the visitor's enquiry. */
export function adminEmailHtml(f: EnquiryFields, siteUrl?: string) {
  const body = `
    ${eyebrow(`New enquiry · ${f.topic}`)}
    <h1 style="margin:0 0 24px;font-weight:400;font-size:26px;line-height:1.3;color:${c.night}">Message from ${f.name}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${c.line};margin:0 0 28px">
      ${row("Name", f.name)}
      ${row("Company", f.company || "—")}
      ${row("Email", `<a href="mailto:${f.email}" style="color:${c.deep}">${f.email}</a>`)}
      ${row("Topic", f.topic)}
    </table>
    ${eyebrow("Message")}
    ${messageBlock(f.message)}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0">
      <tr><td style="background:${c.deep}">
        <a href="mailto:${f.email}?subject=${encodeURIComponent(`Re: Your ${f.topic} enquiry — ${site.name}`)}"
           style="display:inline-block;padding:14px 32px;font-family:${font};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#ffffff;text-decoration:none">Reply to ${f.name}</a>
      </td></tr>
    </table>`;
  return layout({ preheader: `New ${f.topic} enquiry from ${f.name}`, body, siteUrl });
}

/** Confirmation email sent back to the visitor. */
export function clientEmailHtml(f: EnquiryFields, siteUrl?: string) {
  const body = `
    ${eyebrow("Query received")}
    <h1 style="margin:0 0 20px;font-weight:400;font-size:26px;line-height:1.3;color:${c.night}">Thank you, ${f.name}.</h1>
    <p style="margin:0 0 16px">We've received your enquiry and it is now with our <strong>${f.topic}</strong> team. One of our specialists will get back to you within <strong>1–2 business days</strong>.</p>
    <p style="margin:0 0 28px">For your records, here is a copy of what you sent us:</p>
    ${messageBlock(f.message)}
    <p style="margin:28px 0 0">If you need to add anything, simply reply to this email.</p>
    <p style="margin:28px 0 0">Warm regards,<br><span style="color:${c.deep}">The ${site.name} Team</span></p>`;
  return layout({ preheader: `We've received your ${f.topic} enquiry and will be in touch soon.`, body, siteUrl });
}
