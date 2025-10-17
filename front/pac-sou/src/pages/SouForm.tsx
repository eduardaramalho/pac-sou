import React, { useState } from "react";
import logoTopo from "../assets/logo-catolicasc.png"; 
import logoCentro from "../assets/logo-catolica.png";

export default function SouLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Usuário:", usuario, "Senha:", senha);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf4f4]">
      {/* Faixa superior */}
      <header className="bg-[#8A1C1C] py-3 flex items-center">
        <div className="container mx-auto flex items-center pl-6">
          <img
            src={logoTopo}
            alt="Católica SC"
            className="h-12 object-contain"
          />
        </div>
      </header>

      {/* Corpo central */}
      <main className="flex flex-col items-center justify-center flex-1">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center border border-[#d4caca]">
          <img
            src={logoCentro}
            alt="Católica de Santa Catarina"
            className="mx-auto mb-4 h-20 object-contain"
          />

          <h2 className="text-[#8A1C1C] font-bold text-xl mb-4">
            PORTAL DO ALUNO
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-[#EAAE3C] rounded bg-[#EAAE3C]">
              <span className="px-2 text-white text-lg">👤</span>
              <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="flex-1 p-2 outline-none bg-[#EAAE3C] text-white placeholder-white"
              />
            </div>

            <div className="flex items-center border border-[#EAAE3C] rounded bg-[#EAAE3C]">
              <span className="px-2 text-white text-lg">🔒</span>
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="flex-1 p-2 outline-none bg-[#EAAE3C] text-white placeholder-white"
              />
            </div>

            <button
              type="submit"
              className="bg-[#8A1C1C] hover:bg-[#6e1616] text-white w-full py-2 rounded font-semibold"
            >
              ACESSAR
            </button>
          </form>

          <a
            href="#"
            className="block mt-4 text-[#1e3a8a] text-sm font-semibold hover:underline"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </main>
    </div>
  );
}
