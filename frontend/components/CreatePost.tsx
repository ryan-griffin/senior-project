import { useRouter } from "next/router";
import { FC, useState } from "react";
import Button from "./Button";

interface Props {
    state: "hidden" | "shown";
    setState: (state: "hidden" | "shown") => void;
}

const CreatePost: FC<Props> = ({ state, setState }) => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const stateClass =
        state == "hidden"
            ? "-translate-y-[calc(100%+3.5rem)]"
            : "translate-y-2";

    const inputClass: string =
        "bg-gray-200 rounded-md outline-none p-2 focus:bg-gray-300";

    async function createPost(event: any) {
        event.preventDefault();
        await fetch("http://localhost:8080/create-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });
        setTitle("");
        setBody("");
        setState("hidden");
        router.pathname == "/" ? router.replace("/") : router.push("/");
    }

    interface post {
        id: number;
        title: string;
        body: string;
        datetime: string;
    }

    return (
        <form
            className={`flex flex-col w-[650px] p-4 gap-4 fixed z-0 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md  duration-[250ms] ${stateClass}`}
            onSubmit={createPost}
        >
            <input
                className={inputClass}
                type="text"
                minLength={1}
                id="PostTitle"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
            />
            <textarea
                className={inputClass}
                minLength={1}
                id="PostBody"
                placeholder="Body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                required
            />
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
