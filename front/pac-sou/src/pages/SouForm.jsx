import { useState } from "react";
import PopupAgendamento from "./PopupAgendamento";
import PopupAtendimento from "./PopupAtendimento";

export default function SouForm() {
    const [formData, setFormData] = useState({
        nome: "",
        idade: "",
        dataNascimento: "",
        curso: "",
        fase: "",
        turno: "Matutino",
        dificuldade: "",
        relacaoDisciplina: false,
        salaAula: false,
        interacaoColegas: false,
        explicacaoProfessor: false,
        preferencia: "Presencial",
        horario: "",
        data: "",
        observacoes: "",
        profissional: "",
    });

    const [showAgendamento, setShowAgendamento] = useState(false);
    const [showAtendimento, setShowAtendimento] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const salvarFormulario = () => {
        console.log("Dados do Formulário:", formData);
        setShowAgendamento(true);
    };

    const salvarAtendimento = () => {
        console.log("Atendimento:", {
            observacoes: formData.observacoes,
            profissional: formData.profissional,
        });
        setShowAtendimento(true);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
            {/* ...campos do formulário iguais ao que já fizemos antes */}

            <button
                onClick={salvarFormulario}
                className="bg-red-800 text-white w-full py-2 rounded mt-4"
            >
                SALVAR FORMULÁRIO
            </button>

            {/* Atendimento */}
            <div className="mt-8 space-y-3">
                <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    placeholder="Observações"
                    className="border w-full p-2 rounded"
                />
                <input
                    type="text"
                    name="profissional"
                    value={formData.profissional}
                    onChange={handleChange}
                    placeholder="Nome do profissional"
                    className="border w-full p-2 rounded"
                />

                <button
                    onClick={salvarAtendimento}
                    className="bg-red-800 text-white w-full py-2 rounded"
                >
                    SALVAR ATENDIMENTO
                </button>
            </div>

            {/* Popups */}
            {showAgendamento && (
                <PopupAgendamento onClose={() => setShowAgendamento(false)} />
            )}
            {showAtendimento && (
                <PopupAtendimento onClose={() => setShowAtendimento(false)} />
            )}
        </div>
    );
}
