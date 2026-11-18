'use client';

import { useRef, useState, type FormEvent } from 'react';
import { site } from '@/lib/content';

export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [notice, setNotice] = useState('');

  function openDialog() {
    setNotice('');
    dialogRef.current?.showModal();
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    if (!site.contactEmail) {
      setNotice('El formulario todavía no tiene configurado un correo de recepción. Por ahora, podés escribirnos por Instagram.');
      return;
    }

    const name = String(values.get('name') ?? '');
    const email = String(values.get('email') ?? '');
    const phone = String(values.get('phone') ?? '');
    const message = String(values.get('message') ?? '');
    const subject = encodeURIComponent(`Consulta desde la web · ${name}`);
    const body = encodeURIComponent(`Nombre o institución: ${name}\nCorreo electrónico: ${email}\nTeléfono: ${phone || 'No informado'}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    setNotice('Se abrió tu aplicación de correo con la consulta preparada para enviar.');
  }

  return (
    <>
      <button className="button button-light contact-open" type="button" onClick={openDialog}>
        Envíanos tu consulta
        <svg className="button-arrow-out" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M5 19 19 5M6 5h13v13" />
        </svg>
      </button>

      <dialog
        className="contact-dialog"
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="contact-dialog-card">
          <div className="contact-dialog-heading">
            <div>
              <span className="contact-eyebrow">Hablemos de tu proyecto</span>
              <h2 id="contact-dialog-title">Envíanos tu consulta</h2>
              <p>Contanos qué necesitás resolver. Con esta información podemos orientarte mejor.</p>
            </div>
            <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Cerrar formulario">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>

          <form className="contact-form" onSubmit={submitContact}>
            <label>
              <span>Nombre o institución <span className="required-mark">*</span></span>
              <input name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamás?" required />
            </label>
            <label>
              <span>Correo electrónico <span className="required-mark">*</span></span>
              <input name="email" type="email" autoComplete="email" placeholder="nombre@institucion.com" required />
            </label>
            <label>
              <span>Teléfono <span className="optional-mark">Opcional</span></span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Código de área y número" />
            </label>
            <label>
              <span>Mensaje <span className="required-mark">*</span></span>
              <textarea name="message" rows={4} placeholder="Contanos brevemente sobre tu consulta o proyecto…" required />
            </label>
            <div className="contact-form-footer">
              <p className="form-privacy">Usaremos estos datos únicamente para responder tu consulta.</p>
              <button className="button button-dark" type="submit">
                Enviar consulta
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
              </button>
            </div>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>
        </div>
      </dialog>
    </>
  );
}
