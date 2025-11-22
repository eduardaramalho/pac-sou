export type PerfilUsuario = "aluno" | "professor" | "guest";

export function setUsuarioLogado(usuario: string): void {
  const normalizado = usuario.trim().toLowerCase();
  localStorage.setItem("sou_usuario", normalizado);
}

export function getUsuarioLogado(): string {
  const valor = localStorage.getItem("sou_usuario");
  return valor ? valor.trim() : "desconhecido";
}

export function limparUsuarioLogado(): void {
  localStorage.removeItem("sou_usuario");
}

export function getPerfilUsuario(): PerfilUsuario {
  const usuario = getUsuarioLogado().toLowerCase();

  if (usuario === "testealuno") return "aluno";
  if (usuario === "testecoordenador") return "professor";

  return "guest";
}
