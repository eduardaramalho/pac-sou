import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import SouLogin from "./pages/SouLogin";
import SouForm from "./pages/SouForm";
import SouHistorico from "./pages/SouHistory";
import BuscarAluno from "./pages/BuscarAluno";
import logoTopo from "./assets/logo-catolica.png";
import { FormMenu } from "./components/FormMenu";
import SouHistory from "./pages/SouHistory";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const perfil = localStorage.getItem("perfil");

  if (!perfil) {
    // se não estiver logado, volta para login
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F9EFEF" }}>
      {/* Header */}
      <header className="bg-[#8A1C1C] py-4 px-6 flex items-center shadow-md fixed top-0 left-0 w-full z-50">
        <img
          src={logoTopo}
          alt="Católica SC"
          className="h-10 object-contain"
          style={{ maxWidth: "180px" }}
        />
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 pt-[60px] overflow-y-auto flex flex-row">
        <FormMenu onNavigate={(route) => navigate(route)} />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<SouLogin />} />

        <Route element={<Layout />}>
          <Route path="/sou-form" element={<SouForm />} />
          <Route path="/historico" element={<SouHistory />} />
          <Route path="/buscar-aluno" element={<BuscarAluno />} />
        </Route>
      </Routes>
    </Router>
  );
}
