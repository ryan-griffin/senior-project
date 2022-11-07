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

    const [createPostState, setCreatePostState] = useState(false);
    const [createCommunityState, setCreateCommunityState] = useState(false);
    const [createContextMenuState, setCreateContextMenuState] = useState(false);
    const [userContextMenuState, setUserContextMenuState] = useState(false);
    const [loginState, setLoginState] = useState(false);

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

                <Link href="/" className={buttonClass}>
                    <Image
                        src="/icons/home.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
                </Link>
                <Link href="/discover" className={buttonClass}>
                    <Image
                        src="/icons/discover.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
                </Link>
                <Link href="/following" className={buttonClass}>
                    <Image
                        src="/icons/following.svg"
                        alt=""
                        height={iconSize}
                        width={iconSize}
                    />
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
                            if (createCommunityState == true) {
                                setCreateCommunityState(false);
                            }
                            setCreatePostState(true);
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
                            createContextMenuState == false
                                ? setCreateContextMenuState(true)
                                : setCreateContextMenuState(false);
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
                                    if (createCommunityState == true) {
                                        setCreateCommunityState(false);
                                    }
                                    setCreatePostState(true);
                                },
                            },
                            {
                                text: "New Community",
                                icon: "test",
                                onClick: () => {
                                    if (createPostState == true) {
                                        setCreatePostState(false);
                                    }
                                    setCreateCommunityState(true);
                                },
                            },
                        ]}
                        visible={createContextMenuState}
                        setVisible={setCreateContextMenuState}
                    />
                </div>

                <button
                    className="flex ml-auto"
                    onClick={
                        loggedIn
                            ? () =>
                                  userContextMenuState == false
                                      ? setUserContextMenuState(true)
                                      : setUserContextMenuState(false)
                            : () => setLoginState(true)
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
                        visible={userContextMenuState}
                        setVisible={setUserContextMenuState}
                    />
                </button>
            </nav>
            <CreatePost
                visible={createPostState}
                setVisible={setCreatePostState}
            />
            <CreateCommunity
                visible={createCommunityState}
                setVisible={setCreateCommunityState}
            />
            <Login visible={loginState} setVisible={setLoginState} />
        </>
    );
};

export default TopNav;
