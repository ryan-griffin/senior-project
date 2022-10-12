import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import ContextMenu from "./ContextMenu";

interface Props {
    state: "hidden" | "shown";
    setState: (state: "hidden" | "shown") => void;
}

const CreatePost: FC<Props> = ({ state, setState }) => {
    const stateClass =
        state == "hidden"
            ? "-translate-y-[calc(100%+3.5rem)]"
            : "translate-y-2";

    const router = useRouter();

    const [community, setCommunity] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [communityMenuState, setCommunityMenuState] = useState<
        "hidden" | "shown"
    >("hidden");
    const [items, setItems] = useState<{ text: string; onClick: () => void }[]>(
        []
    );

    async function getCommunities() {
        const res = await fetch("http://localhost:8080/communities");
        const communities = await res.json();
        setItems(() =>
            communities.map((community: { name: string }) => ({
                text: community.name,
                onClick: () => setCommunity(community.name),
            }))
        );
    }

    async function createPost(event: any) {
        event.preventDefault();
        const res = await fetch("http://localhost:8080/create-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ community, title, body }),
        });
        const post = await res.json();
        setCommunity("");
        setTitle("");
        setBody("");
        setState("hidden");
        router.push(`/post/${post.id}`);
    }

    useEffect(() => {
        getCommunities();
    });

    return (
        <form
            className={`flex flex-col w-[650px] p-4 gap-4 fixed z-0 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md  duration-[250ms] ${stateClass}`}
            onSubmit={createPost}
        >
            <div>
                <Input
                    placeholder="Community"
                    value={community}
                    onChange={setCommunity}
                    onFocus={() => setCommunityMenuState("shown")}
                    onFocusOut={() => setCommunityMenuState("hidden")}
                    style={{ width: "100%" }}
                />
                <ContextMenu
                    items={items}
                    state={communityMenuState}
                    setState={setCommunityMenuState}
                    style={{ width: "calc(100% - 32px)" }}
                />
            </div>

            <Input placeholder="Title" value={title} onChange={setTitle} />
            <Input placeholder="Body" value={body} onChange={setBody} />
            <div className="flex gap-4">
                <Button
                    text="Cancel"
                    type="button"
                    style="secondary"
                    onClick={() => setState("hidden")}
                />
                <Button text="Create Post" type="submit" style="primary" />
            </div>
        </form>
    );
};

export default CreatePost;
