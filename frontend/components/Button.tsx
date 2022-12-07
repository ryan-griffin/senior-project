import { FC } from "react";

interface Props {
    text: string;
    type: "button" | "submit";
    style: "primary" | "secondary";
    onClick?: () => void;
    customStyle?: string;
}

const Button: FC<Props> = ({ text, type, style, onClick, customStyle }) => (
    <input
        className={`p-2 rounded-md cursor-pointer duration-100 ${
            style == "primary"
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "text-black bg-gray-200 hover:bg-gray-300"
        } ${customStyle}`}
        value={text}
        type={type}
        onClick={onClick}
    />
);

export default Button;
