import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const TopNav: FC = () => {
    const linkClass: string =
        "pointer h-10 w-10 relative p-1 rounded-md hover:bg-gray-200";
    const iconSize: number = 32;
    return (
        <nav className="fixed w-full h-12 border-solid border-b border-black top-0 bg-white flex p-1 gap-1">
            <Link href="/">
                <a className={linkClass}>
                    <Image
                        src="/icons/home.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
                </a>
            </Link>
            <Link href="/discover">
                <a className={linkClass}>
                    <Image
                        src="/icons/discover.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
                </a>
            </Link>
            <Link href="/following">
                <a className={linkClass}>
                    <Image
                        src="/icons/following.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
                </a>
            </Link>
            <input
                className="bg-gray-200 rounded-md outline-none p-1 w-96"
                type="text"
                placeholder="Search"
            />
        </nav>
    );
};

export default TopNav;
