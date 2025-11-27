// Função para realizar login
export async function login(email: string, password: string): Promise<{ token: string; role: string } | null> {
  try {
    const response = await fetch('http://localhost:8082/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (data.token && data.role) {
      return { token: data.token, role: data.role };
    }
    return null;
  } catch (error) {
    return null;
  }
}
export type PerfilUsuario = "aluno" | "professor" | "guest";

export function setUsuarioLogado(usuario: string): void {
  const normalizado = usuario.trim().toLowerCase();
  localStorage.setItem("sou_usuario", normalizado);
}

export function getUsuarioLogado(): string {
  const valor = localStorage.getItem("perfil");
  return valor ? valor.trim() : "desconhecido";
}

export function limparUsuarioLogado(): void {
  localStorage.removeItem("perfil");
}

export function getPerfilUsuario(): String {
  const usuario = getUsuarioLogado().toLowerCase();
  return usuario;
}
