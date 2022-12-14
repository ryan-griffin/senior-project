import { NextPage } from "next";
import Post from "../../components/Post";

export async function getServerSideProps(context: any) {
    const ip = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const res = await fetch(`http://${ip}/community/${context.params.name}`);
    const res2 = await fetch(`http://${ip}/posts/${context.params.name}`);
    const community = await res.json();
    const posts = await res2.json();
    return { props: { community, posts } };
}

interface Props {
    community: {
        name: string;
        user: string;
        description: string;
        datetime: string;
    };
    posts: {
        id: number;
        user: string;
        community: string;
        title: string;
        body: string;
        datetime: string;
    }[];
}

const CommunityPage: NextPage<Props> = ({ community, posts }) => {
    const postList = posts.map((post) => <Post key={post.id} post={post} />);

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-lg shadow-md overflow-hidden">
                <div className="bg-black w-full h-56"></div>
                <div className="bg-white p-4">
                    <h1>Name: {community.name}</h1>
                    <p>Description: {community.description}</p>
                    <p>Datetime: {community.datetime}</p>
                </div>
            </div>
            {postList}
        </div>
    );
};

export default CommunityPage;
