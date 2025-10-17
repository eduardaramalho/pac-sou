interface PopupAgendamentoProps {
  onClose: () => void;
}

export default function PopupAgendamento({ onClose }: PopupAgendamentoProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md">
        <h2 className="text-lg font-bold mb-2">SEU AGENDAMENTO FOI ENCAMINHADO!</h2>
        <p className="mb-4 text-sm text-gray-700">
          Aguarde o nosso contato via Teams para confirmação da data e horário.
        </p>
        <button
          onClick={onClose}
          className="bg-red-800 text-white px-6 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}
