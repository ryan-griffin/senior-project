import { FC } from "react";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface Props {
    items: { text: string; icon?: string; onClick: () => void }[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
    style?: string;
}

const ContextMenu: FC<Props> = ({ items, visible, setVisible, style }) => {
    let height = 8;
    let duration = 10;
    items.forEach(() => {
        height += 44;
        duration += 60;
    });

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setVisible]);

    return (
        <div
            className={`bg-white rounded-lg shadow-md absolute top-14 overflow-hidden ${style}`}
            style={{
                maxHeight: visible ? `${height}px` : "0px",
                transitionDuration: `${duration}ms`,
            }}
            ref={ref}
        >
            <div className="flex flex-col p-1 gap-1">
                {items.map((item, key) => (
                    <button
                        className="flex p-2 gap-2 rounded-md hover:bg-gray-200 duration-100 cursor-pointer text-left"
                        key={key}
                        onClick={() => {
                            item.onClick();
                            setVisible(false);
                        }}
                    >
                        {item.icon ? (
                            <Image
                                src={item.icon}
                                width={24}
                                height={24}
                                alt=""
                            />
                        ) : null}

                        {item.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ContextMenu;
