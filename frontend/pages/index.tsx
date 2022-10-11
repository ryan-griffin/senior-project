import type { NextPage } from "next";
import Post from "../components/Post";

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

    return <div className="flex flex-col gap-4">{postList}</div>;
};

export default index;
