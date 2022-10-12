import { NextPage } from "next";

export async function getServerSideProps(context: any) {
    const res = await fetch(
        `http://localhost:8080/community/${context.params.id}`
    );
    const community = await res.json();
    return { props: { community } };
}

interface Props {
    community: {
        name: string;
        description: string;
        datetime: string;
    };
}

const CommunityPage: NextPage<Props> = ({ community }) => {
    return (
        <div className="rounded-lg shadow-md overflow-hidden">
            <div className="bg-black w-full h-56"></div>
            <div className="bg-white p-4">
                <h1>Name: {community.name}</h1>
                <p>Description: {community.description}</p>
                <p>Datetime: {community.datetime}</p>
            </div>
        </div>
    );
};

export default CommunityPage;
