import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CreatePost from "./CreatePost";

const TopNav: FC = () => {
    const buttonClass: string = "h-10 w-10 p-1 rounded-md hover:bg-gray-200";
    const iconSize: number = 32;

    const hidden: string = "-translate-y-[calc(100%+3.5rem)]";
    const [createPostState, setCreatePostState] = useState(hidden);

    return (
        <>
            <nav className="fixed w-full z-10 h-12 border-solid border-b border-gray-300 top-0 bg-white flex p-1 gap-1">
                <div className="mr-auto bg-black">
                    <Image
                        src="/icons/logo.png"
                        alt=""
                        height={39}
                        width={39}
                    />
                </div>
                <Link href="/">
                    <a className={buttonClass}>
                        <Image
                            src="/icons/home.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </a>
                </Link>
                <Link href="/discover">
                    <a className={buttonClass}>
                        <Image
                            src="/icons/discover.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </a>
                </Link>
                <Link href="/following">
                    <a className={buttonClass}>
                        <Image
                            src="/icons/following.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </a>
                </Link>
                <input
                    className="bg-gray-200 rounded-md outline-none p-1 w-[500px] focus:bg-gray-300"
                    type="text"
                    placeholder="Search"
                />
                <div className="flex h-10">
                    <div
                        className="p-1 rounded-l-md hover:bg-gray-200 border-solid border-r border-gray-300"
                        onClick={() => {
                            createPostState == hidden
                                ? setCreatePostState("translate-y-2")
                                : setCreatePostState(hidden);
                        }}
                    >
                        <Image
                            src="/icons/plus.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </div>
                    <div className="p-1 rounded-r-md hover:bg-gray-200">
                        <Image
                            src="/icons/down_arrow.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </div>
                </div>
                <div className="flex gap-1 h-10 p-1 rounded-md hover:bg-gray-200 ml-auto">
                    <div className="rounded-full bg-black">
                        <Image
                            src="/icons/user.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </div>
                    <div className="m-auto">Username</div>
                    <Image
                        src="/icons/down_arrow.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
                </div>
            </nav>
            <CreatePost state={createPostState} />
        </>
    );
};

export default TopNav;
