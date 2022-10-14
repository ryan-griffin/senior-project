import { FC } from "react";
import Input from "./Input";
import Button from "./Button";
import SegmentedControl from "./SegmentedControl";
import { useState } from "react";

interface Props {
    state: "hidden" | "shown";
    setState: (state: "hidden" | "shown") => void;
}

const Login: FC<Props> = ({ state, setState }) => {
    const [typeState, setTypeState] = useState<"login" | "signup">("login");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const containerClass = state == "shown" ? "flex" : "hidden";

    return (
        <div
            className={`fixed top-0 left-0 z-20 h-screen w-screen bg-black/50 p-4 justify-center items-center ${containerClass}`}
        >
            <div className="flex flex-col p-4 gap-4 bg-white rounded-lg shadow-md w-[352px]">
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
                    type="button"
                    style="primary"
                    onClick={
                        typeState == "login"
                            ? () => console.log("Login")
                            : () => console.log("Sign Up")
                    }
                />
                <Button
                    text="Cancel"
                    type="button"
                    style="secondary"
                    onClick={() => setState("hidden")}
                />
            </div>
        </div>
    );
};

export default Login;
