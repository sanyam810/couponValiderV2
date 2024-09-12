import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Auth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); 

    async function sendRequest() {
        setLoading(true); 
        try {
            const response = await axios.post(`http://127.0.0.1:8787/api/v1/auth/signin`, postInputs,{
                withCredentials: true, 
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            toast.success('Sign In Successful!');
            navigate("/home");
        } catch (e) {
            console.error(e);
            toast.error('Invalid credentials');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <Toaster /> 
            <div className="flex justify-center">
                <div>
                    <div className="px-10 ">
                        <div className="text-3xl font-extrabold pl-9">
                          Sign In
                        </div>
                        <div className="text-slate-400">
                            Sign in to your account
                        </div>
                    </div>
                    <div className="pt-8">
                        <LabelledInput 
                            placeholder="Enter your email" 
                            label="Email" 
                            onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} 
                        />
                        <LabelledInput 
                            placeholder="Enter your password" 
                            type="password" 
                            label="Password" 
                            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} 
                        />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 relative"
                            disabled={loading}
                        >
                            {loading ? (<div style={{marginLeft:'90px'}}>
                                <svg
                                    className="w-5 h-5 mr-3 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 0114.32-2.82A5.977 5.977 0 0012 18a5.977 5.977 0 00-5.68-8.82A8 8 0 014 12z"
                                    />
                                </svg>
                            </div>
                                
                            ) : (
                                'Sign In'
                            )}
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
