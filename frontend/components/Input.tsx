import { FC } from "react";

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ placeholder, value, onChange }) => (
    <input
        className="bg-gray-200 rounded-md outline-none p-2 focus:bg-gray-300"
        minLength={1}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
    />
);

export default Input;
