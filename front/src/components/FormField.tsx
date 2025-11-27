import React from "react";

interface FormFieldProps {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex items-center bg-[#F2F2F2] rounded-md overflow-hidden h-12 w-full shadow-sm">
      {/* Ícone à esquerda */}
      <div className="bg-[#EAAE3C] w-12 h-full flex justify-center items-center">
        <Icon className="text-white text-[22px]" />
      </div>

      {/* Campo de entrada */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-[#F2F2F2] text-gray-700 text-sm px-3 py-2 outline-none placeholder:text-gray-500"
      />
    </div>
  );
}
