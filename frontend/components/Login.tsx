import { FC } from "react";
import Input from "./Input";
import Button from "./Button";
import SegmentedControl from "./SegmentedControl";
import { useState } from "react";

interface Props {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const Login: FC<Props> = ({ visible, setVisible }) => {
    const [typeState, setTypeState] = useState<"login" | "signup">("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const containerClass = visible == true ? "flex" : "hidden";

    async function createUser() {
        await fetch(
            `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/create-user`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            }
        );
        setUsername("");
        setPassword("");
        setVisible(false);
    }

    return (
        <div
            className={`fixed top-0 left-0 z-20 h-screen w-screen bg-black/50 p-4 justify-center items-center ${containerClass}`}
        >
            <form
                className="flex flex-col p-4 gap-4 bg-white rounded-lg shadow-md w-[344px] animate-grow"
                onSubmit={(event) => {
                    event.preventDefault();
                    typeState == "login" ? console.log("login") : createUser();
                }}
            >
                <h1 className="text-2xl font-bold text-center">
                    {typeState == "login" ? "Login" : "Sign Up"}
                </h1>
                <SegmentedControl
                    options={[
                        { text: "Login", action: () => setTypeState("login") },
                        {
                            text: "Sign Up",
                            action: () => setTypeState("signup"),
                        },
                    ]}
                />
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={setUsername}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />
                <Button
                    text={typeState == "login" ? "Login" : "Sign Up"}
                    type="submit"
                    style="primary"
                />
                <Button
                    text="Cancel"
                    type="button"
                    style="secondary"
                    onClick={() => setVisible(false)}
                />
            </form>
        </div>
    );
};

export default Login;
