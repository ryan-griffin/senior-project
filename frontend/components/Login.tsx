import { FC } from "react";
import Input from "./Input";
import Button from "./Button";
import SegmentedControl from "./SegmentedControl";

interface Props {
    state: "hidden" | "shown";
    setState: (state: "hidden" | "shown") => void;
}

const Login: FC<Props> = ({ state, setState }) => {
    const containerClass = state == "shown" ? "flex" : "hidden";

    return (
        <div
            className={`fixed top-0 left-0 z-20 h-screen w-screen bg-black/50 p-4 justify-center items-center ${containerClass}`}
        >
            <div className="flex flex-col p-4 gap-4 bg-white rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <SegmentedControl
                    options={[
                        { text: "Login", action: () => console.log("Login") },
                        {
                            text: "Sign Up",
                            action: () => console.log("Sign Up"),
                        },
                    ]}
                />
                <Input
                    placeholder="Username"
                    value=""
                    onChange={() => console.log("username")}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value=""
                    onChange={() => console.log("password")}
                />
                <Button
                    text="Login"
                    type="button"
                    style="primary"
                    onClick={() => console.log("Login")}
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
