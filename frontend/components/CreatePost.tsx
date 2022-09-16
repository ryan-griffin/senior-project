import { FC, useState } from "react";

const CreatePost: FC = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    function createPost(event: any) {
        console.log(title);
        console.log(body);
        setTitle("");
        setBody("");
        event.preventDefault();
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
