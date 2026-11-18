import type { applications } from '@/lib/content';

type ApplicationType = (typeof applications)[number]['type'];

export function ApplicationMark({ type }: { type: ApplicationType }) {
  const marks = {
    tramites: <><rect x="3" y="5" width="26" height="22" rx="2" /><path d="M3 12h26m-21-4h1m3 0h1m-5 9h7m-7 5h12" /></>,
    ventas: <><rect x="3" y="5" width="26" height="22" rx="2" /><path d="M12 5v22m8-22v22M6.5 11h2m7 0h2m6 0h2M6.5 15h2m7 0h2" /></>,
    inventario: <path d="m4 9 12-6 12 6v14l-12 6-12-6zm0 0 12 6 12-6m-12 6v14M10 6l12 6v5" />,
    automatizacion: <><path d="M7 23a11 11 0 0 1 18-14l2 2" /><path d="M27 5v6h-6M25 9a11 11 0 0 1-18 14l-2-2" /><path d="M5 27v-6h6" /></>,
    chatbots: <><path d="M6 6h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H13l-7 4v-4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z" /><path d="M9 14h1m5 0h1m5 0h1M10 19h12" /></>,
    otros: <><rect x="4" y="4" width="10" height="10" rx="1" /><rect x="18" y="4" width="10" height="10" rx="1" /><rect x="4" y="18" width="10" height="10" rx="1" /><rect x="18" y="18" width="10" height="10" rx="1" /></>,
  };
  return <svg className="application-mark" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{marks[type]}</svg>;
}
