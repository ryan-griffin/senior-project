import { FC } from "react";

interface Props {
    items: { text: string; icon?: string; onClick: () => void }[];
    state: "hidden" | "shown";
    setState: (state: "hidden" | "shown") => void;
}

const ContextMenu: FC<Props> = ({ items, state, setState }) => {
    const menuItems = items.map((item, key) => (
        <div
            className="p-2 rounded-md hover:bg-gray-200 duration-100 cursor-pointer"
            key={key}
            onClick={() => {
                item.onClick();
                setState("hidden");
            }}
        >
            {item.text}
        </div>
    ));

    let height = 8;
    items.forEach(() => {
        height += 40;
    });

    const stateClass = state == "hidden" ? "max-h-0" : `max-h-[${height}px]`;

    return (
        <div
            className={`bg-white rounded-lg shadow-lg absolute top-14 duration-[150ms] overflow-hidden ${stateClass}`}
        >
            <div className="m-1 gap-1">{menuItems}</div>
        </div>
    );
};

export default ContextMenu;
