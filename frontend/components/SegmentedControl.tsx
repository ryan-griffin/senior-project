import { FC } from "react";
import { useState } from "react";

interface Props {
    options: { text: string; action: () => void }[];
}

const SegmentedControl: FC<Props> = ({ options }) => {
    const segActiveClass = "w-full z-10 p-1 rounded-md duration-100";
    const segInactiveClass = `${segActiveClass} hover:bg-gray-300`;

    const width = `calc(${100 / options.length}% - 0.5rem)`;

    const translate = options.map((_, index) =>
        index > 0
            ? `translateX(calc(${index.toString()}00% + ${index * 0.5}rem))`
            : "translateX(0)"
    );

    const [activeTab, setActiveTab] = useState(() =>
        options.indexOf(options[0])
    );

    return (
        <div className="flex p-1 gap-1 bg-gray-200 rounded-md relative">
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
                className="bg-white h-[32px] rounded-md shadow-md absolute duration-200"
                style={{
                    width: width,
                    transform: translate[activeTab],
                }}
            ></div>
        </div>
    );
};

export default SegmentedControl;
