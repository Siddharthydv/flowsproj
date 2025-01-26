"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
console.log(BACKEND_URL)
export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div> 
        {/* <Appbar /> */}
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-4">
                    Work smarter, not harder. Unless you&apos;re into that sort of thing.                    </div>
                    <div className="pb-6 pt-4">
                        <CheckFeature label={"Easy setup, no coding required"} />
                    </div>
                    <div className="pb-6">
                        <CheckFeature label={"Free forever for core features"} />
                    </div>
                    {/* <CheckFeature label={"14-day trial of premium features & apps"} /> */}

                </div>
                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                    <Input label={"Name"} onChange={e => {
                        setName(e.target.value)
                    }} type="text" placeholder="Your name"></Input>
                    <Input onChange={e => {
                        setEmail(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    <Input onChange={e => {
                        setPassword(e.target.value)
                    }} label={"Password"} type="password" placeholder="Password"></Input>

                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
			try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                username: email,
                password,
                name,
            });

            // If the signup is successful, redirect to the login page
            router.push("/login");
        } catch (error:any) {
            // Handle errors
            if (error.response) {
                // The server responded with a status code other than 2xx
                console.error("Error:", error.response.data.message || "An error occurred");
                alert(error.response.data.message || "Signup failed");
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response from the server");
                alert("No response from the server. Please try again later.");
            } else {
                // Something went wrong while setting up the request
                console.error("Error:", error.message);
                alert("An unexpected error occurred. Please try again.");
            }
        }		
                        }} size="small">Get started free</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
