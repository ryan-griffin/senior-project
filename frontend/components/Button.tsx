import { FC } from "react";

interface Props {
    text: string;
    type: "button" | "submit";
    style: "primary" | "secondary";
    onClick?: () => void;
}

const Button: FC<Props> = ({ text, style, type, onClick }) => {
    const buttonStyle =
        style == "primary"
            ? "text-white bg-blue-500 hover:bg-blue-600"
            : "text-black bg-gray-200 hover:bg-gray-300";

    return (
        <input
            className={`p-2 w-full rounded-md cursor-pointer duration-100 ${buttonStyle}`}
            type={type}
            value={text}
            onClick={onClick}
        />
    );
};

export default Button;
