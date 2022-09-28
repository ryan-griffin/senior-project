import { useRouter } from "next/router";
import { FC, useState } from "react";

const CreatePost: FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    async function createPost(event: any) {
        event.preventDefault();
        const res = await fetch("http://localhost:8080/create-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });
        const post: post = await res.json();
        router.reload();
    }

    interface post {
        id: number;
        title: string;
        body: string;
        datetime: string;
    }

    const inputClass: string = "border-2 border-black hover:outline-none";

    return (
        <form className="m-10 flex flex-col gap-5 w-56" onSubmit={createPost}>
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
            <input className="bg-blue-500" type="submit" value="Create Post" />
        </form>
    );
};

export default CreatePost;
