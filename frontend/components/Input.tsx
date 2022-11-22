import { FC } from "react";

interface InputProps {
    placeholder: string;
    value: string;
    type?: "password";
    onChange: (event: string) => void;
    onFocus?: () => void;
    onFocusOut?: () => void;
    icon?: string;
    style?: string;
}

const Input: FC<InputProps> = ({
    placeholder,
    value,
    type,
    onChange,
    onFocus,
    onFocusOut,
    icon,
    style,
}) => (
    <input
        className={`bg-gray-200 rounded-md outline-none p-2 duration-100 focus:bg-gray-300 placeholder:text-gray-400 ${style} ${
            icon ? `${icon} pl-10 bg-no-repeat bg-[left_6px_center]` : ""
        } `}
        minLength={1}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onBlur={onFocusOut}
        required
    />
);

export default Input;
