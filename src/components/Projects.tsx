import Image from 'next/image';

const projects = [
  {
    title: 'Trámites municipales en línea',
    sector: 'Sector público',
    image: '/proyectos/tramites-municipales.webp',
    description: 'Desarrollamos portales que reúnen los trámites municipales en un solo lugar. Desde su cuenta, cada vecino puede realizar las gestiones disponibles, consultar su información tributaria y acceder a sus datos personales.',
  },
  {
    title: 'Gestión comercial de repuestos automotores',
    sector: 'Autopartes',
    image: '/proyectos/repuestos-automotores.webp',
    description: 'Creamos un sistema para marcas de repuestos que conecta el catálogo y el stock con el circuito de venta. El equipo puede consultar qué piezas tiene disponibles al cotizar, gestionar el pedido y seguir su envío desde la misma herramienta.',
  },
  {
    title: 'Inventario para operaciones logísticas',
    sector: 'Logística',
    image: '/proyectos/inventario-logistico.webp',
    description: 'Desarrollamos un sistema de inventario para el sector logístico. En un depósito, cada recepción y cada despacho cambian lo que queda disponible. Conocer las existencias por artículo ayuda al equipo a decidir qué pedidos puede preparar y dónde puede faltar mercadería.',
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="projects" aria-labelledby="projects-heading">
      <div className="frame">
        <div className="section-intro" data-scroll-reveal>
          <h2 id="projects-heading">Proyectos realizados</h2>
        </div>
        <div className="project-list">
          {projects.map(({ title, sector, image, description }) => (
            <article className="project-case" key={title}>
              <div className="project-media" data-scroll-reveal>
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 89vw, (max-width: 1350px) 44vw, 590px"
                />
              </div>
              <div className="project-copy" data-scroll-reveal>
                <p className="project-sector">{sector}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="project-image-note">Imágenes ilustrativas.</p>
      </div>
    </section>
  );
}
