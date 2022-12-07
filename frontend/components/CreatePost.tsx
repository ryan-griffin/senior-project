import { useRouter } from "next/router";
import { FC, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import ContextMenu from "./ContextMenu";

interface Props {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const CreatePost: FC<Props> = ({ visible, setVisible }) => {
    const stateClass =
        visible == false ? "-translate-y-[calc(100%+3.5rem)]" : "translate-y-2";

    const router = useRouter();

    const [community, setCommunity] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [communityMenuVisible, setCommunityMenuVisible] = useState(false);
    const [items, setItems] = useState<{ text: string; onClick: () => void }[]>(
        []
    );

    async function getCommunities() {
        const res = await fetch(
            `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/communities`
        );
        const communities = await res.json();
        setItems(() =>
            communities.map((community: { name: string }) => ({
                text: community.name,
                onClick: () => setCommunity(community.name),
            }))
        );
    }

    async function createPost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const res = await fetch(
            `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/create-post`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ community, title, body }),
            }
        );
        const post = await res.json();
        setCommunity("");
        setTitle("");
        setBody("");
        setVisible(false);
        router.push(`/post/${post.id}`);
    }

    return (
        <form
            className={`flex flex-col w-[650px] p-4 gap-4 fixed z-0 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md  duration-[250ms] ${stateClass}`}
            onSubmit={createPost}
        >
            <h1 className="text-xl font-semibold">Create a Post</h1>
            <div>
                <Input
                    placeholder="Community"
                    value={community}
                    onChange={setCommunity}
                    onFocus={() => setCommunityMenuVisible(true)}
                    onFocusOut={() => setCommunityMenuVisible(false)}
                    style="w-full"
                />
                <ContextMenu
                    items={items}
                    visible={communityMenuVisible}
                    setVisible={setCommunityMenuVisible}
                    style="w-[calc(100%-32px)]"
                />
            </div>

            <Input placeholder="Title" value={title} onChange={setTitle} />
            <Input placeholder="Body" value={body} onChange={setBody} />
            <div className="flex gap-4">
                <Button
                    text="Cancel"
                    type="button"
                    style="secondary"
                    customStyle="w-full"
                    onClick={() => setVisible(false)}
                />
                <Button
                    text="Create Post"
                    type="submit"
                    style="primary"
                    customStyle="w-full"
                />
            </div>
        </form>
    );
};

export default CreatePost;
