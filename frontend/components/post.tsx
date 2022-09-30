import { FC } from "react";

interface Props {
    post: { id: number; title: String; body: String; datetime: String };
}

const Post: FC<Props> = ({ post }) => (
    <div className="p-4 bg-white rounded-lg shadow-md w-1/3 m-auto">
        <div>Id: {post.id}</div>
        <div>Title: {post.title}</div>
        <div>Body: {post.body}</div>
        <div>Datetime: {post.datetime}</div>
    </div>
);

export default Post;
