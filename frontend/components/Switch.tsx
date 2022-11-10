import { FC } from "react";
import { useState } from "react";

interface Props {
    defaultState: boolean;
    onAction: () => void;
    offAction: () => void;
}

const Switch: FC<Props> = ({ defaultState, onAction, offAction }) => {
    const [on, toggle] = useState(defaultState);

    return (
        <button
            className={`w-12 h-6 p-1 rounded-full duration-200 [&>*]:hover:scale-110 ${
                on ? "bg-blue-500" : "bg-gray-200"
            }`}
            onClick={() => {
                on ? offAction() : onAction();
                toggle(!on);
            }}
        >
            <div
                className={`h-full aspect-square bg-white shadow-sm rounded-full duration-200 ${
                    on ? "translate-x-6" : "translate-x-0"
                }`}
            ></div>
        </button>
    );
};

export default Switch;
