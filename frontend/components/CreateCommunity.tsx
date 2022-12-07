import { useRouter } from "next/router";
import { FC, useState } from "react";
import Button from "./Button";
import Input from "./Input";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const CreateCommunity: FC<Props> = ({ visible, setVisible }) => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const stateClass =
        visible == false ? "-translate-y-[calc(100%+3.5rem)]" : "translate-y-2";

    async function createCommunity(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await fetch(
            `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/create-community`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description }),
            }
        );
        setName("");
        setDescription("");
        setVisible(false);
        router.push(`/community/${name}`);
    }

    return (
        <form
            className={`flex flex-col w-[650px] p-4 gap-4 fixed z-10 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md  duration-[250ms] ${stateClass}`}
            onSubmit={createCommunity}
        >
            <h1 className="text-xl font-semibold">Create a Community</h1>
            <Input placeholder="Name" value={name} onChange={setName} />
            <Input
                placeholder="Description"
                value={description}
                onChange={setDescription}
            />
            <div className="flex gap-4">
                <Button
                    text="Cancel"
                    type="button"
                    style="secondary"
                    customStyle="w-full"
                    onClick={() => setVisible(false)}
                />
                <Button
                    text="Create a Community"
                    type="submit"
                    style="primary"
                    customStyle="w-full"
                />
            </div>
        </form>
    );
};

export default CreateCommunity;
