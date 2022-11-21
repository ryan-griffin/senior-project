import { FC } from "react";

const Switch: FC = () => (
    <label className="cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-12 h-7 p-1 bg-gray-200 rounded-full duration-200 after:absolute after:h-5 after:w-5 after:bg-white after:rounded-full after:shadow-sm after:duration-200 after:hover:scale-105 peer-checked:bg-blue-500 peer-checked:after:translate-x-full" />
    </label>
);

export default Switch;
