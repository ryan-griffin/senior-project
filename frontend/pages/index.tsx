import type { NextPage } from "next";
import Post from "../components/post";
import CreatePost from "../components/CreatePost";

export async function getServerSideProps() {
    const res = await fetch("http://localhost:8080/posts");
    const posts = await res.json();
    return {
        props: { posts },
    };
}

interface Props {
    posts: { id: number; title: string; body: string; datetime: string }[];
}

const index: NextPage<Props> = ({ posts }) => {
    const postList = posts.map((post) => <Post key={post.id} post={post} />);

    return (
        <div className="p-10 flex flex-col gap-10">
            <CreatePost />
            <div className="flex flex-col gap-10">{postList}</div>
        </div>
    );
};

export default index;
