import { FC } from "react";
import { useState } from "react";

interface Props {
    options: { text: string; action: () => void }[];
}

const SegmentedControl: FC<Props> = ({ options }) => {
    const width = `calc(${100 / options.length}% - 6px)`;

    const translate = options.map((_, index) =>
        index > 0
            ? `translateX(calc(${index}00% + ${index * 6}px - 2px))`
            : "translateX(0)"
    );

    const [activeTab, setActiveTab] = useState(() =>
        options.indexOf(options[0])
    );

    return (
        <div className="flex p-1 gap-1 bg-gray-200 rounded-lg relative">
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`w-full rounded-md relative h-8 flex duration-100 ${
                        activeTab != index ? "hover:bg-gray-300" : ""
                    }`}
                    onClick={() => {
                        setActiveTab(index);
                        option.action();
                    }}
                >
                    <div className="absolute z-10 p-1 w-full rounded-md">
                        {option.text}
                    </div>
                </button>
            ))}
            <div
                className="absolute h-8 bg-white rounded-md shadow-md duration-200"
                style={{
                    width: width,
                    transform: translate[activeTab],
                }}
            />
        </div>
    );
};

export default SegmentedControl;
