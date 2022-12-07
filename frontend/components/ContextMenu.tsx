import { FC } from "react";
import Image from "next/image";

interface Props {
    items: { text: string; icon?: string; onClick: () => void }[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
    style?: React.CSSProperties;
}

const ContextMenu: FC<Props> = ({ items, visible, setVisible, style }) => {
    let height = 8;
    let duration = 10;
    items.forEach(() => {
        height += 44;
        duration += 50;
    });

    return (
        <div
            className="bg-white rounded-lg shadow-md absolute top-14 overflow-hidden"
            style={{
                maxHeight: visible == false ? "0px" : `${height}px`,
                transitionDuration: `${duration}ms`,
                ...style,
            }}
        >
            <div className="flex flex-col m-1 gap-1">
                {items.map((item, key) => (
                    <button
                        className="flex p-2 gap-2 rounded-md hover:bg-gray-200 duration-100 cursor-pointer text-left"
                        key={key}
                        onClick={() => {
                            item.onClick();
                            setVisible(false);
                        }}
                    >
                        {item.icon != undefined ? (
                            <Image
                                src={`/icons/${item.icon}`}
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
