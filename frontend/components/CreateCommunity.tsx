import { useRouter } from "next/router";
import { FC, useState } from "react";
import Button from "./Button";
import Input from "./Input";

interface Props {
    state: "hidden" | "shown";
    setState: (state: "hidden" | "shown") => void;
}

const CreateCommunity: FC<Props> = ({ state, setState }) => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const stateClass =
        state == "hidden"
            ? "-translate-y-[calc(100%+3.5rem)]"
            : "translate-y-2";

    async function createCommunity(event: any) {
        event.preventDefault();
        await fetch("http://localhost:8080/create-community", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        });
        setName("");
        setDescription("");
        setState("hidden");
        router.pathname == "/" ? router.replace("/") : router.push("/");
    }

    return (
        <form
            className={`flex flex-col w-[650px] p-4 gap-4 fixed z-0 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md  duration-[250ms] ${stateClass}`}
            onSubmit={createCommunity}
        >
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
                    onClick={() => setState("hidden")}
                />
                <Button text="Create Community" type="submit" style="primary" />
            </div>
        </form>
    );
};

export default CreateCommunity;
