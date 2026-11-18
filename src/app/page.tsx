import Image from 'next/image';
import { ApplicationMark } from '@/components/ApplicationMark';
import { Orbit } from '@/components/Orbit';
import { Projects } from '@/components/Projects';
import { Process, Questions } from '@/components/ProjectGuide';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ContactDialog } from '@/components/ContactDialog';
import { applications, site } from '@/lib/content';

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? 'button-arrow-down' : 'button-arrow-out'} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d={down ? 'M12 4v15m-6-6 6 6 6-6' : 'M5 19 19 5M6 5h13v13'} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header id="inicio" className="masthead">
        <div className="frame masthead-inner">
        <a href="#inicio" aria-label="Focaro Digital, inicio">
          <Image src="/marca/logotipo.svg" alt="Focaro Digital" width={186} height={40} priority unoptimized />
        </a>
        <nav aria-label="Navegación principal" className="flex items-center">
          <a className="nav-section" href="#que-hacemos">Qué hacemos</a>
          <a className="nav-section" href="#proyectos">Proyectos</a>
          <a className="nav-section" href="#como-trabajamos">Cómo trabajamos</a>
          <a className="nav-contact" href="#contacto">Contacto <span aria-hidden="true">↘</span></a>
        </nav>
        </div>
      </header>
      <main id="contenido">
        <section className="hero" aria-labelledby="portada">
          <div className="frame hero-layout">
            <div className="hero-copy">
              <h1 id="portada">Desarrollo web<br /><span>y software.</span></h1>
              <p>Tu próxima web puede hacer más que presentar tu negocio. Desarrollamos sitios y aplicaciones para recibir consultas, organizar pedidos y darle a tu equipo la información que necesita para trabajar.</p>
              <a className="button button-light" href="#que-hacemos">Conocé qué hacemos <Arrow down /></a>
            </div>
            <Orbit />
          </div>
        </section>
        <section id="que-hacemos" className="frame applications" aria-labelledby="aplicaciones">
          <div className="section-intro" data-scroll-reveal>
            <h2 id="aplicaciones">Qué hacemos</h2>
            <p>Creamos landing pages para presentar productos, servicios y marcas personales. También desarrollamos sistemas web para digitalizar trámites, acompañar ventas y ordenar operaciones. Cada solución parte de cómo trabaja la organización y de lo que sus usuarios necesitan resolver.</p>
          </div>
          <div className="application-grid">
            {applications.map(({ type, title, description }) => (
              <article key={type} data-scroll-reveal>
                <ApplicationMark type={type} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <Projects />
        <Process />
        <Questions />
        <section id="contacto" className="contact">
          <div className="frame contact-layout">
            <div data-scroll-reveal>
              <h2>¿Qué proceso te gustaría simplificar?</h2>
              <p>Contanos qué proceso querés simplificar y qué te gustaría resolver.</p>
            </div>
            <div className="contact-actions">
              <ContactDialog />
              <a className="instagram-link" href={site.instagram} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.6" cy="6.7" r="1.1" fill="currentColor" />
                </svg>
                <span>También estamos en Instagram</span>
                <Arrow />
              </a>
            </div>
          </div>
        </section>
        <ScrollReveal />
      </main>
      <footer className="frame footer">
        <span>Focaro Digital</span>
        <a href="#inicio">Volver al inicio <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}
