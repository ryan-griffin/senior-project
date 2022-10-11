import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
    post: { id: number; title: String; body: String; datetime: String };
}

const Post: FC<Props> = ({ post }) => {
    const router = useRouter();
    async function deletePost() {
        await fetch(`http://localhost:8080/delete-post/${post.id}`, {
            method: "DELETE",
        });
        router.pathname == "/"
            ? router.replace(router.asPath)
            : router.push("/");
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-1/3 m-auto overflow-hidden break-words">
            <div
                className="cursor-pointer"
                onClick={() => router.push(`/post/${post.id}`)}
            >
                Id: {post.id}
            </div>
            <div>Title: {post.title}</div>
            <div>Body: {post.body}</div>
            <div>Datetime: {post.datetime}</div>
            <button className="text-red-500" onClick={deletePost}>
                Delete
            </button>
        </div>
    );
};

export default Post;
