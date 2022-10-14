import { FC } from "react";

interface InputProps {
    placeholder: string;
    value: string;
    type?: "password";
    onChange: (event: string) => void;
    onFocus?: () => void;
    onFocusOut?: () => void;
    style?: React.CSSProperties;
}

const Input: FC<InputProps> = ({
    placeholder,
    value,
    type,
    onChange,
    onFocus,
    onFocusOut,
    style,
}) => (
    <input
        className="bg-gray-200 rounded-md outline-none p-2 duration-100 focus:bg-gray-300"
        style={style}
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
