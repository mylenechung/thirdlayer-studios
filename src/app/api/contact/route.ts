import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company, type, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Third Layer Studios <noreply@thirdlayer-studios.com>',
      to: 'hello@thirdlayer-studios.com',
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #141414;">
          <h2 style="font-size: 20px; margin: 0 0 24px;">New Project Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 10px 0; color: #888; width: 130px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #EE5A3B;">${email}</a></td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; color: #888; vertical-align: top;">Company</td>
              <td style="padding: 10px 0;">${company}</td>
            </tr>` : ''}
            ${type ? `
            <tr>
              <td style="padding: 10px 0; color: #888; vertical-align: top;">Project Type</td>
              <td style="padding: 10px 0;">${type}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 28px; padding: 24px 28px; background: #f9f7f4; border-left: 3px solid #EE5A3B;">
            <p style="margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 32px; color: #aaa; font-size: 12px;">Sent via thirdlayer-studios.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
