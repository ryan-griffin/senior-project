import type { NextPage } from "next";

export async function getServerSideProps() {
    const res = await fetch("http://127.0.0.1:8080");
    const data = await res.text();
    return {
        props: { data },
    };
}

interface Props {
    data: string;
}

const index: NextPage<Props> = ({ data }) => {
    return <div>{data}</div>;
};

export default index;
