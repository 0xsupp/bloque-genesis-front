export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

