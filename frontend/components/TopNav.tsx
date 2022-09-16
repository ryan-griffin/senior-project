import { FC } from "react";
import Link from "next/link";

const TopNav: FC = () => {
    return (
        <nav className="sticky w-full h-14 border-solid border-b border-gray-500">
            <Link href="/">Home</Link>
        </nav>
    );
};

export default TopNav;
