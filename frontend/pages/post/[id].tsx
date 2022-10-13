import { NextPage } from "next";
import Post from "../../components/Post";

export async function getServerSideProps(context: any) {
    const res = await fetch(`http://localhost:8080/post/${context.params.id}`);
    const post = await res.json();
    return { props: { post } };
}

interface Props {
    post: {
        id: number;
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
