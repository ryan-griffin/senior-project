import { FC } from "react";

interface Props {
    items: { text: string; icon?: string; onClick: () => void }[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
    style?: React.CSSProperties;
}

const ContextMenu: FC<Props> = ({ items, visible, setVisible, style }) => {
    const menuItems = items.map((item, key) => (
        <div
            className="p-2 rounded-md hover:bg-gray-200 duration-100 cursor-pointer"
            key={key}
            onClick={() => {
                item.onClick();
                setVisible(false);
            }}
        >
            {item.text}
        </div>
    ));

    let height = 8;
    let duration = 10;
    items.forEach(() => {
        height += 40;
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
            <div className="m-1 gap-1">{menuItems}</div>
        </div>
    );
};

export default ContextMenu;
