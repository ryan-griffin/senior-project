import { FC } from "react";
import { useState } from "react";

interface Props {
    onAction: () => void;
    offAction: () => void;
}

const Switch: FC<Props> = ({ onAction, offAction }) => {
    const stateClass = on ? "bg-blue-500" : "bg-gray-300";

    return (
        <div
            className={`w-14 h-8 bg-gray-200 rounded-full p-1 duration-200 cursor-pointer ${stateClass}`}
            onClick={}
        >
            <div
                className={`h-full aspect-square bg-white shadow-sm rounded-full duration-200 ${offset}`}
            ></div>
        </div>
    );
};

export default Switch;
