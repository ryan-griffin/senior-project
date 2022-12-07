import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CreatePost from "./CreatePost";
import CreateCommunity from "./CreateCommunity";
import ContextMenu from "./ContextMenu";
import Login from "./Login";
import Input from "./Input";

const TopNav: FC = () => {
    const buttonClass =
        "h-10 w-10 p-[6px] rounded-md hover:bg-gray-200 duration-100";
    const iconSize: number = 28;

    const [createPostVisible, setCreatePostVisible] = useState(false);
    const [createCommunityVisible, setCreateCommunityVisible] = useState(false);
    const [createContextMenuVisible, setCreateContextMenuVisible] =
        useState(false);
    const [userContextMenuVisible, setUserContextMenuState] = useState(false);
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

                <Input
                    placeholder="Search"
                    value=""
                    onChange={() => console.log("search")}
                    icon="bg-[url('/icons/search.svg')]"
                    style="w-[500px]"
                />

                <div className="flex h-10 cursor-pointer">
                    <div
                        className="p-[6px] rounded-l-md hover:bg-gray-200 border-solid border-r border-gray-300 duration-100"
                        onClick={() => {
                            if (createCommunityVisible == true) {
                                setCreateCommunityVisible(false);
                            }
                            setCreatePostVisible(true);
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
                        className="p-[6px] rounded-r-md hover:bg-gray-200 duration-100"
                        onClick={() => {
                            createContextMenuVisible == false
                                ? setCreateContextMenuVisible(true)
                                : setCreateContextMenuVisible(false);
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
                                text: "Create a Post",
                                onClick: () => {
                                    if (createCommunityVisible == true) {
                                        setCreateCommunityVisible(false);
                                    }
                                    setCreatePostVisible(true);
                                },
                            },
                            {
                                text: "Create a Community",
                                onClick: () => {
                                    if (createPostVisible == true) {
                                        setCreatePostVisible(false);
                                    }
                                    setCreateCommunityVisible(true);
                                },
                            },
                        ]}
                        visible={createContextMenuVisible}
                        setVisible={setCreateContextMenuVisible}
                    />
                </div>

                <button
                    className="flex ml-auto"
                    onClick={
                        loggedIn
                            ? () =>
                                  userContextMenuVisible == false
                                      ? setUserContextMenuState(true)
                                      : setUserContextMenuState(false)
                            : () => setLoginState(true)
                    }
                >
                    <div className="flex h-10 p-1 gap-1 rounded-md hover:bg-gray-200 cursor-pointer duration-100">
                        <Image
                            src="/icons/profile.svg"
                            alt=""
                            height={32}
                            width={32}
                        />
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
                        visible={userContextMenuVisible}
                        setVisible={setUserContextMenuState}
                    />
                </button>
            </nav>
            <CreatePost
                visible={createPostVisible}
                setVisible={setCreatePostVisible}
            />
            <CreateCommunity
                visible={createCommunityVisible}
                setVisible={setCreateCommunityVisible}
            />
            <Login visible={loginState} setVisible={setLoginState} />
        </>
    );
};

export default TopNav;
