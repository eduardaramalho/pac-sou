import React, { useState } from "react";
import {
  FaBars,
  FaUserGraduate,
  FaUsers,
  FaHistory,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      animate={{ width: open ? 220 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[#8A1C1C] text-white min-h-screen flex flex-col items-center py-4 shadow-lg"
    >
      {/* Topo: logo e botão */}
      <div className="flex items-center justify-between w-full px-4 mb-10">
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Menu principal */}
      <nav className="flex flex-col items-start w-full px-3 space-y-6">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#"
          className="flex items-center w-full p-2 rounded-md hover:bg-[#A12424] transition-colors"
        >
          <FaUserGraduate size={22} className="min-w-[30px]" />
          {open && <span className="ml-3 text-sm font-medium">Alunos</span>}
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#"
          className="flex items-center w-full p-2 rounded-md hover:bg-[#A12424] transition-colors"
        >
          <FaUsers size={22} className="min-w-[30px]" />
          {open && (
            <span className="ml-3 text-sm font-medium">Coordenadores</span>
          )}
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#"
          className="flex items-center w-full p-2 rounded-md hover:bg-[#A12424] transition-colors"
        >
          <FaHistory size={22} className="min-w-[30px]" />
          {open && (
            <span className="ml-3 text-sm font-medium">Histórico</span>
          )}
        </motion.a>
      </nav>

      {/* Rodapé */}
      <div className="mt-auto text-center w-full px-4 py-6">
        <div className="bg-[#A12424] hover:bg-[#B73030] transition rounded-lg py-3 text-xs font-semibold shadow-inner">
          Católica SC <br />
          <span className="opacity-75 text-[11px]">Portal do Aluno</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
