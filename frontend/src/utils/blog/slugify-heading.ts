export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9\s-]/g, "") // quita símbolos
    .trim()
    .replace(/\s+/g, "-"); // espacios -> guiones
}
