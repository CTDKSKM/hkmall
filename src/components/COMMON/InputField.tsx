import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const InputField = ({ label, type, value, onChange, placeholder, required = false }: InputFieldProps) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
