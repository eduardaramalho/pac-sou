import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcecec]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Cabeçalho */}
        <div className="bg-[#8b1d2c] p-4 flex items-center justify-between rounded-t-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Logo_Cat%C3%B3lica_SC.png/320px-Logo_Cat%C3%B3lica_SC.png"
            alt="Católica SC"
            className="h-10"
          />
        </div>

        {/* Conteúdo */}
        <div className="p-6 bg-[#a11f2f] text-white text-center rounded-b-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Logo_Cat%C3%B3lica_SC.png/320px-Logo_Cat%C3%B3lica_SC.png"
            alt="Logo"
            className="mx-auto h-20 mb-4"
          />
          <h2 className="text-xl font-bold mb-6">PORTAL DO ALUNO</h2>

          {/* Formulário */}
          <form className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Usuário"
                className="w-full px-4 py-2 pl-10 rounded-md text-black"
              />
              <span className="absolute left-3 top-2.5 text-gray-500">👤</span>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                className="w-full px-4 py-2 pl-10 rounded-md text-black"
              />
              <span className="absolute left-3 top-2.5 text-gray-500">🔒</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d13c3c] hover:bg-[#b23030] text-white font-semibold py-2 rounded-md"
            >
              ACESSAR
            </button>
          </form>

          {/* Link de recuperação */}
          <div className="mt-4">
            <a href="#" className="text-sm underline hover:text-gray-200">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
