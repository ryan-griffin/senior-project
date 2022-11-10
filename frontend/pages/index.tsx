import type { NextPage } from "next";
import Post from "../components/Post";
import Switch from "../components/Switch";

export async function getServerSideProps() {
    const res = await fetch(
        `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/posts`
    );
    const posts = await res.json();
    return {
        props: { posts },
    };
}

interface Props {
    posts: {
        id: number;
        user: string;
        community: string;
        title: string;
        body: string;
        datetime: string;
    }[];
}

const index: NextPage<Props> = ({ posts }) => {
    const postList = posts.map((post) => <Post key={post.id} post={post} />);

    return (
        <div className="flex flex-col gap-4">
            {postList}
            <Switch on={true} />
        </div>
    );
};

export default index;
