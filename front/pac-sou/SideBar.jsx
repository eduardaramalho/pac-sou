import React, { useState } from "react";
import { FaBars, FaUserGraduate, FaUsers, FaHistory } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-16"
        } bg-[#8b1d2c] text-white min-h-screen p-4 transition-all duration-300`}
      >
        {/* Topo com logo e botão */}
        <div className="flex items-center justify-between mb-6">
          {open && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Logo_Cat%C3%B3lica_SC.png/320px-Logo_Cat%C3%B3lica_SC.png"
              alt="Católica SC"
              className="h-10"
            />
          )}
          <button onClick={() => setOpen(!open)} className="text-white ml-2">
            <FaBars size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-[#a11f2f] p-2 rounded"
          >
            <FaUserGraduate />
            {open && <span>Alunos</span>}
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-[#a11f2f] p-2 rounded"
          >
            <FaUsers />
            {open && <span>Coordenadores</span>}
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-[#a11f2f] p-2 rounded"
          >
            <FaHistory />
            {open && <span>Histórico de Consultas</span>}
          </a>
        </nav>
      </div>

      {/* Conteúdo da página */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bem-vindo ao Portal</h1>
        <p className="mt-2">Aqui ficará o conteúdo da página.</p>
      </div>
    </div>
  );
};

export default Sidebar;
