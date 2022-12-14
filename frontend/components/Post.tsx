import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
    post: {
        id: number;
        community: string;
        title: string;
        body: string;
        datetime: string;
    };
}

const Post: FC<Props> = ({ post }) => {
    const router = useRouter();
    async function deletePost() {
        await fetch(
            `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/delete-post/${post.id}`,
            {
                method: "DELETE",
            }
        );
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
            <div
                className="cursor-pointer"
                onClick={() => router.push(`/community/${post.community}`)}
            >
                Community: {post.community}
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
