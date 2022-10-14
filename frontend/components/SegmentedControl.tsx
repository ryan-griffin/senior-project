import { FC } from "react";
import { useState } from "react";

interface Props {
    options: { text: string; action: () => void }[];
}

const SegmentedControl: FC<Props> = ({ options }) => {
    const segActiveClass = "w-full p-2 rounded-md duration-100 z-10";
    const segInactiveClass = `${segActiveClass} hover:bg-gray-300`;

    const [activeTab, setActiveTab] = useState(() =>
        options.indexOf(options[0])
    );

    const translate = options.map((_, index) => {
        if (index > 0) {
            const percent = `${index.toString()}00`;
            const px = index * 8;
            return `translateX(calc(${percent}% + ${px}px))`;
        } else {
            return "translateX(0)";
        }
    });

    return (
        <div className="flex p-1 gap-1 bg-gray-200 rounded-md">
            {options.map((option, index) => {
                return (
                    <button
                        key={index}
                        className={
                            activeTab == index
                                ? segActiveClass
                                : segInactiveClass
                        }
                        onClick={() => {
                            setActiveTab(index);
                            option.action();
                        }}
                    >
                        {option.text}
                    </button>
                );
            })}
            <div
                className="bg-white h-[40px] w-[152px] rounded-md shadow-md absolute duration-100"
                style={{
                    transform: `${translate[activeTab]}`,
                }}
            ></div>
        </div>
    );
};

export default SegmentedControl;
