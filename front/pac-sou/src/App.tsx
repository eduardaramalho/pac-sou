import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SouLogin from "./pages/SouLogin";
import SouForm from "./pages/SouForm";
import logoTopo from "./assets/logo-catolica.png";

// 🔹 Layout base com AppBar fixa
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F9EFEF" }}>
      {/* 🔻 Barra fixa no topo */}
      <header className="bg-[#8A1C1C] py-4 px-6 flex items-center shadow-md fixed top-0 left-0 w-full z-50">
        <img
          src={logoTopo}
          alt="Católica SC"
          className="h-10 object-contain"
          style={{ maxWidth: "180px" }}
        />
      </header>

      {/* 🔻 Conteúdo principal abaixo da barra */}
      <main className="flex-1 pt-[60px] overflow-y-auto"> 
        {/* O padding-top evita que o conteúdo fique escondido sob o header */}
        <Outlet />
      </main>
    </div>
  );
};

// 🔹 Rotas principais
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login sem header */}
        <Route path="/" element={<SouLogin />} />

        {/* Páginas internas com header fixo */}
        <Route element={<Layout />}>
          <Route path="/sou-form" element={<SouForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
