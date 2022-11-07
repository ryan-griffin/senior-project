import { NextPage } from "next";
import Post from "../../components/Post";

export async function getServerSideProps(context: any) {
    const res = await fetch(
        `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/post/${context.params.id}`
    );
    const post = await res.json();
    return { props: { post } };
}

interface Props {
    post: {
        id: number;
        user: string;
        community: string;
        title: string;
        body: string;
        datetime: string;
    };
}

const PostPage: NextPage<Props> = ({ post }) => {
    return <Post post={post} />;
};

export default PostPage;
