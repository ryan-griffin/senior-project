import { FC } from "react";

const Post: FC<Props> = ({ post }) => {
    return (
        <div>
            <div className="text-xl">Id: {post.id}</div>
            <div className="text-xl">Title: {post.title}</div>
            <div className="text-xl">body: {post.body}</div>
            <div className="text-xl">Date: {post.datetime}</div>
        </div>
    );
};

interface Props {
    post: { id: number; title: String; body: String; datetime: String };
}

export default Post;
