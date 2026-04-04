const NOTIFY_URL = import.meta.env.VITE_NOTIFY_URL;
const NOTIFY_APP_ID = import.meta.env.VITE_NOTIFY_APP_ID;

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

interface ContactPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  message?: string;
  company?: string;
  subject?: string;
  source: string;
  tags: string[];
  [key: string]: unknown;
}

async function postContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${NOTIFY_URL}/api/apps/${NOTIFY_APP_ID}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Notify API error: ${res.status}`);
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message?: string;
}): Promise<void> {
  const { firstName, lastName } = splitName(data.name);
  await postContact({
    email: data.email,
    firstName,
    ...(lastName && { lastName }),
    ...(data.company && { company: data.company }),
    ...(data.subject && { subject: data.subject }),
    message: data.message,
    source: "contact_form",
    tags: ["contact"],
  });
}

export async function subscribeNewsletter(email: string): Promise<void> {
  await postContact({
    email,
    source: "newsletter",
    tags: ["newsletter"],
  });
}
