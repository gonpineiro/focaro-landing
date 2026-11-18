import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  const recipient = process.env.CONTACT_TO;

  if (!gmailUser || !appPassword || !recipient) {
    return NextResponse.json({ message: 'El envío del formulario no está configurado.' }, { status: 503 });
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ message: 'La consulta supera el tamaño permitido.' }, { status: 413 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'No pudimos leer los datos del formulario.' }, { status: 400 });
  }

  // Campo trampa para bots. Contestamos como si se hubiera enviado, sin mandar correo.
  if (asText(payload.companyWebsite)) {
    return NextResponse.json({ message: 'Consulta recibida.' });
  }

  const name = asText(payload.name);
  const email = asText(payload.email);
  const phone = asText(payload.phone);
  const message = asText(payload.message);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    name.length < 2 || name.length > 120 ||
    email.length > 254 || !emailPattern.test(email) ||
    phone.length > 40 ||
    message.length < 5 || message.length > 5_000
  ) {
    return NextResponse.json({ message: 'Revisá los datos ingresados e intentá nuevamente.' }, { status: 422 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: appPassword },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      from: { name: 'Focaro Digital · Web', address: gmailUser },
      to: recipient,
      replyTo: { name, address: email },
      subject: 'Nueva consulta desde la web de Focaro Digital',
      text: [
        'Nueva consulta recibida desde la landing de Focaro Digital',
        '',
        `Nombre o institución: ${name}`,
        `Correo electrónico: ${email}`,
        `Teléfono: ${phone || 'No informado'}`,
        '',
        'Mensaje:',
        message,
      ].join('\n'),
    });

    return NextResponse.json({ message: 'Consulta recibida.' });
  } catch (error) {
    console.error('No se pudo enviar el formulario de contacto por Gmail SMTP.', error);
    return NextResponse.json({ message: 'No pudimos enviar la consulta. Probá nuevamente en unos minutos.' }, { status: 502 });
  } finally {
    transporter.close();
  }
}
