import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  // Llama a la función notFound para mostrar la página 404
  notFound();
}

