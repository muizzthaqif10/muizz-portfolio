import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character,
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;

  if (!apiKey || !recipient) {
    return NextResponse.json({ error: 'Contact service is not configured.' }, { status: 503 });
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
    };
    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const message = body.message?.trim() || '';

    if (body.website || !name || !emailPattern.test(email) || !message) {
      return NextResponse.json({ error: 'Please complete all fields.' }, { status: 400 });
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio contact form <onboarding@resend.dev>',
        to: [recipient],
        reply_to: email,
        subject: `[Muizz Thaqif] New message from ${name}`,
        html: `<h2>New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to send message.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 400 });
  }
}