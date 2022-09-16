import { FC } from "react";

interface Props {
    post: { id: number; title: String; body: String; datetime: String };
}

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

export default Post;
