import { FC } from "react";
import { useState } from "react";

interface Props {
    options: { text: string; action: () => void }[];
}

const SegmentedControl: FC<Props> = ({ options }) => {
    const segClass = "w-1/2 p-2 rounded-md duration-100";
    const segActiveClass = `${segClass} bg-white shadow-md`;
    const segInactiveClass = `${segClass} hover:bg-gray-300`;

    const [activeTab, setActiveTab] = useState<string>(options[0].text);

    const segOptions = options.map((option, index) => (
        <button
            key={index}
            className={
                option.text == activeTab ? segActiveClass : segInactiveClass
            }
            onClick={() => {
                setActiveTab(option.text);
                option.action();
            }}
        >
            {option.text}
        </button>
    ));

    return (
        <div className="flex p-1 gap-1 bg-gray-200 rounded-md">
            {segOptions}
        </div>
    );
};

export default SegmentedControl;
