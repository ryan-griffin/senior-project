import { FC } from "react";

interface Props {
    text: string;
    style: "primary" | "secondary";
    onClick?: () => void;
}

const Button: FC<Props> = ({ text, style, onClick }) => {
    let buttonStyle: string;
    style == "primary"
        ? (buttonStyle =
              "bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md")
        : (buttonStyle =
              "bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-md");

    return (
        <button className={buttonStyle} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
