const steps = [
  ['Miramos cómo trabajás hoy', 'Seguimos un caso de punta a punta. ¿Quién recibe el pedido? ¿Dónde lo anota? ¿A quién le avisa cuando está listo? Ahí aparece lo que vale la pena simplificar.'],
  ['Le damos forma en pantalla', 'Una maqueta permite discutir algo concreto. Probamos dónde buscarías un pedido, qué dato necesitás a mano y qué debería ver cada persona.'],
  ['Elegimos por dónde empezar', 'Si la prioridad es saber qué falta entregar, empezamos por ese recorrido. Los reportes o las alertas pueden sumarse cuando el equipo los necesite.'],
] as const;

const questions = [
  ['¿Me conviene una web, un catálogo o un sistema?', 'Una web institucional te presenta y facilita el contacto. Un catálogo permite recorrer lo que ofrecés. Si además necesitás registrar una operación y seguir su estado, ahí empieza a tener sentido un sistema.'],
  ['¿Puedo seguir usando mi planilla?', 'Sí. Podemos tomar tu planilla como punto de partida y revisar qué conviene conservar. Si varios equipos editan copias distintas, el primer paso es acordar dónde se actualiza el dato que todos consultan.'],
  ['¿Qué hace falta para estimar un proyecto?', 'Ayuda saber quién va a usar la herramienta, qué tarea tiene que poder completar y con qué otros sistemas se relaciona. Con ese alcance podemos conversar sobre tiempos y costos.'],
  ['¿Qué les mando en el primer mensaje?', 'Contanos brevemente a qué se dedica tu negocio, qué problema te gustaría resolver o qué proyecto digital tenés en mente. Con esa información podemos entender qué necesitás y orientarte sobre cómo empezar.'],
] as const;

export function Process() {
  return (
    <section id="como-trabajamos" className="frame guide-layout" aria-labelledby="process-heading">
      <div data-scroll-reveal>
        <h2 id="process-heading">Cómo trabajamos</h2>
        <p className="guide-intro">Antes de escribir código, queremos entender qué pasa en tu negocio un martes cualquiera.</p>
      </div>
      <ol className="process-list">
        {steps.map(([title, text]) => <li key={title} data-scroll-reveal><h3>{title}</h3><p>{text}</p></li>)}
      </ol>
    </section>
  );
}

export function Questions() {
  return (
    <section className="frame guide-layout faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" data-scroll-reveal>Preguntas frecuentes</h2>
      <div>
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<span aria-hidden="true" className="faq-toggle" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
