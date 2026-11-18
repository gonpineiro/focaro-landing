'use client';

import { useId, useRef, useState, type FormEvent } from 'react';

type ContactDialogProps = {
  triggerLabel?: string;
  triggerClassName?: string;
};

export function ContactDialog({ triggerLabel = 'Envíanos tu consulta', triggerClassName = 'button button-light contact-open' }: ContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();

  function openDialog() {
    setNotice('');
    dialogRef.current?.showModal();
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setIsSubmitting(true);
    setNotice('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'),
          email: values.get('email'),
          phone: values.get('phone'),
          message: values.get('message'),
          companyWebsite: values.get('companyWebsite'),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'No pudimos enviar la consulta.');
      }

      form.reset();
      setNotice('¡Gracias! Recibimos tu consulta y nos pondremos en contacto.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No pudimos enviar la consulta. Probá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button className={triggerClassName} type="button" onClick={openDialog}>
        {triggerLabel}
        <svg className="button-arrow-out" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M5 19 19 5M6 5h13v13" />
        </svg>
      </button>

      <dialog
        className="contact-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="contact-dialog-card">
          <div className="contact-dialog-heading">
            <div>
              <span className="contact-eyebrow">Hablemos de tu proyecto</span>
              <h2 id={titleId}>Envíanos tu consulta</h2>
              <p>Contanos qué necesitás resolver. Con esta información podemos orientarte mejor.</p>
            </div>
            <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Cerrar formulario">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>

          <form className="contact-form" onSubmit={submitContact}>
            <label className="contact-trap" aria-hidden="true">
              Sitio web
              <input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
            </label>
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
              <button className="button button-dark" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando…' : 'Enviar consulta'}
                {!isSubmitting && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>}
              </button>
            </div>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>
        </div>
      </dialog>
    </>
  );
}
