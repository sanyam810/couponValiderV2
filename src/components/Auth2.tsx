import { ChangeEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = () => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState({
        email: "",
        password: "",
        name:""
    });

    

    async function sendRequest() {
        try {
            const endpoint = "signup"
            const response = await axios.post(`https://zappbackend.sanyamsaini081.workers.dev/api/v1/auth/signup`, postInputs,
                {
                    withCredentials: true,  
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response.data);
            // navigate("/signin");
        } catch (e) {
            console.error(e);
            alert("Invalid credentials");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 ">
                        <div className="text-3xl font-extrabold pl-9">
                          Sign Up
                        </div>
                        <div className="text-slate-400">
                            Sign Up to your account
                            {/* <Link className="pl-2 underline" to={isSignup ? "/signin" : "/signup"}>
                                {isSignup ? "Sign In" : "Sign Up"}
                            </Link> */}
                        </div>
                    </div>
                    <div className="pt-8">
                        
                        <LabelledInput placeholder="sanyam" label="Name" onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} />
                        <LabelledInput placeholder="sanyam@gmail.com" label="Email" onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
                        <LabelledInput placeholder="123456" type="password" label="Password" onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputProps {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type = "text" }: LabelledInputProps) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default Auth;
