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

    const formattedTime = new Intl.DateTimeFormat('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());
    const siteName = 'muizzthaqif.vercel.app';

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New portfolio enquiry</title>
        </head>
        <body style="margin:0; padding:0; background:#f3f6f4; font-family:Arial, Helvetica, sans-serif; color:#10201d;">
          <div style="max-width:640px; margin:0 auto; padding:32px 20px;">
            <div style="background:#ffffff; border:1px solid #d9e3df; border-radius:18px; overflow:hidden; box-shadow:0 18px 45px -34px rgba(16,32,29,0.4);">
              <div style="background:linear-gradient(135deg, #087f70 0%, #0f7c72 100%); padding:24px 28px 18px;">
                <div style="display:inline-block; background:rgba(255,255,255,0.14); border:1px solid rgba(255,255,255,0.24); border-radius:999px; padding:6px 12px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#e8fffb; font-weight:700;">
                  Portfolio enquiry
                </div>
                <h1 style="margin:18px 0 6px; font-size:28px; line-height:1.2; color:#ffffff; font-family:Arial, Helvetica, sans-serif;">New message from ${escapeHtml(name)}</h1>
                <p style="margin:0; color:#d9f8f1; font-size:14px;">Received on ${escapeHtml(formattedTime)}</p>
              </div>

              <div style="padding:28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate; border-spacing:0 12px; font-size:15px;">
                  <tr>
                    <td style="width:120px; color:#5b706a; font-weight:700; padding:0;">Name</td>
                    <td style="padding:0; color:#10201d; font-weight:600;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="width:120px; color:#5b706a; font-weight:700; padding:0;">Email</td>
                    <td style="padding:0; color:#10201d;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#087f70; text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:24px; padding-top:18px; border-top:1px solid #d9e3df;">
                  <p style="margin:0 0 12px; color:#5b706a; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">Message</p>
                  <div style="background:#f8fbfa; border:1px solid #e2ece8; border-radius:12px; padding:18px 16px; color:#10201d; line-height:1.7; font-size:15px;">
                    ${escapeHtml(message).replace(/\n/g, '<br />')}
                  </div>
                </div>

                <div style="margin-top:28px; text-align:left;">
                  <a href="mailto:${escapeHtml(email)}?subject=Re%3A%20${encodeURIComponent(`Portfolio enquiry from ${name}`)}" style="display:inline-block; background:#087f70; color:#ffffff; text-decoration:none; border-radius:10px; padding:12px 18px; font-size:14px; font-weight:700;">
                    Reply to ${escapeHtml(name)}
                  </a>
                </div>
              </div>

              <div style="padding:20px 28px 28px; border-top:1px solid #e7efec; background:#fbfcfa;">
                <p style="margin:0; color:#5b706a; font-size:12px; line-height:1.6;">
                  Sent via the contact form on <a href="https://${siteName}" style="color:#087f70; text-decoration:none;">${siteName}</a>.<br />
                  Website: <a href="https://${siteName}" style="color:#087f70; text-decoration:none;">${siteName}</a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

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
        subject: `[${siteName}] New message from ${name}`,
        html: emailHtml,
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