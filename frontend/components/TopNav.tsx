import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CreatePost from "./CreatePost";
import CreateCommunity from "./CreateCommunity";
import ContextMenu from "./ContextMenu";
import Login from "./Login";

const TopNav: FC = () => {
    const buttonClass =
        "h-10 w-10 p-1 rounded-md hover:bg-gray-200 duration-100";
    const iconSize: number = 32;

    type state = "hidden" | "shown";
    const [createPostState, setCreatePostState] = useState<state>("hidden");
    const [createCommunityState, setCreateCommunityState] =
        useState<state>("hidden");
    const [createContextMenuState, setCreateContextMenuState] =
        useState<state>("hidden");
    const [userContextMenuState, setUserContextMenuState] =
        useState<state>("hidden");
    const [loginState, setLoginState] = useState<state>("hidden");

    const loggedIn = false;

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

                <div className="flex h-10 cursor-pointer">
                    <div
                        className="p-1 rounded-l-md hover:bg-gray-200 border-solid border-r border-gray-300 duration-100"
                        onClick={() => {
                            if (createCommunityState == "shown") {
                                setCreateCommunityState("hidden");
                            }
                            setCreatePostState("shown");
                        }}
                    >
                        <Image
                            src="/icons/plus.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </div>
                    <div
                        className="p-1 rounded-r-md hover:bg-gray-200 duration-100"
                        onClick={() => {
                            createContextMenuState == "hidden"
                                ? setCreateContextMenuState("shown")
                                : setCreateContextMenuState("hidden");
                        }}
                    >
                        <Image
                            src="/icons/down_arrow.svg"
                            alt=""
                            height={iconSize}
                            width={iconSize}
                        />
                    </div>
                    <ContextMenu
                        items={[
                            {
                                text: "New Post",
                                icon: "test",
                                onClick: () => {
                                    if (createCommunityState == "shown") {
                                        setCreateCommunityState("hidden");
                                    }
                                    setCreatePostState("shown");
                                },
                            },
                            {
                                text: "New Community",
                                icon: "test",
                                onClick: () => {
                                    if (createPostState == "shown") {
                                        setCreatePostState("hidden");
                                    }
                                    setCreateCommunityState("shown");
                                },
                            },
                        ]}
                        state={createContextMenuState}
                        setState={setCreateContextMenuState}
                    />
                </div>

                <button
                    className="flex ml-auto"
                    onClick={
                        loggedIn
                            ? () =>
                                  userContextMenuState == "hidden"
                                      ? setUserContextMenuState("shown")
                                      : setUserContextMenuState("hidden")
                            : () => setLoginState("shown")
                    }
                >
                    <div className="flex h-10 p-1 gap-1 rounded-md hover:bg-gray-200 cursor-pointer duration-100">
                        <div className="rounded-full bg-black">
                            <Image
                                src="/icons/user.svg"
                                alt=""
                                height={iconSize}
                                width={iconSize}
                            />
                        </div>
                        <div className="m-auto">Login</div>
                    </div>
                    <ContextMenu
                        items={[
                            {
                                text: "Profile",
                                onClick: () => console.log("Profile"),
                            },
                            {
                                text: "Settings",
                                onClick: () => console.log("Settings"),
                            },
                            {
                                text: "Logout",
                                onClick: () => console.log("Logout"),
                            },
                        ]}
                        state={userContextMenuState}
                        setState={setUserContextMenuState}
                    />
                </button>
            </nav>
            <CreatePost state={createPostState} setState={setCreatePostState} />
            <CreateCommunity
                state={createCommunityState}
                setState={setCreateCommunityState}
            />
            <Login state={loginState} setState={setLoginState} />
        </>
    );
};

export default TopNav;
