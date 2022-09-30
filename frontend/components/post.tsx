import { FC } from "react";

interface Props {
    post: { id: number; title: String; body: String; datetime: String };
}

const Post: FC<Props> = ({ post }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-1/2 m-auto">
            <div className="text-xl">Id: {post.id}</div>
            <div className="text-xl">Title: {post.title}</div>
            <div className="text-xl">Body: {post.body}</div>
            <div className="text-xl">Datetime: {post.datetime}</div>
        </div>
    );
};

export default Post;
