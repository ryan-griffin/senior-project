import { FC } from "react";
import { useState } from "react";

interface Props {
    options: string[];
}

const SegmentedControl: FC<Props> = ({ options }) => {
    const segClass = "w-1/2 p-2 rounded-md duration-100";
    const segActiveClass = `${segClass} bg-white shadow-md`;
    const segInactiveClass = `${segClass} hover:bg-gray-300`;

    const [activeTab, setActiveTab] = useState<string>(options[0]);

    const segOptions = options.map((option, index) => (
        <button
            key={index}
            className={option == activeTab ? segActiveClass : segInactiveClass}
            onClick={() => setActiveTab(option)}
        >
            {option}
        </button>
    ));

    return (
        <div className="flex p-1 gap-1 bg-gray-200 rounded-md">
            {segOptions}
        </div>
    );
};

export default SegmentedControl;
