"use client";

import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { useCookies } from "../cookiecontext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { cookies, setCookies } = useCookies();

    return (
        <>
            {/* <Appbar /> */}
            <div className="flex justify-center">
                <div className="flex pt-8 max-w-4xl">
                    <div className="flex-1 pt-20 px-4">
                        <div className="font-semibold text-3xl pb-4">
                            Connecting the dots so you don&apos;t have to. Literally.
                        </div>
                        <div className="pb-6 pt-4">
                            <CheckFeature label={"Easy setup, no coding required"} />
                        </div>
                        <div className="pb-6">
                            <CheckFeature label={"Free forever for core features"} />
                        </div>
                        {/* <CheckFeature label={"14-day trial of premium features & apps"} /> */}
                    </div>
                    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                        <Input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            label={"Email"}
                            type="text"
                            placeholder="Your Email"
                        />
                        <Input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            label={"Password"}
                            type="password"
                            placeholder="Password"
                        />
                        <div className="pt-4">
                            <PrimaryButton
                                onClick={async () => {
					try {
                                        const res = await axios.post(
                                            `${BACKEND_URL}/api/v1/user/signin`,
                                            {
                                                username: email,
                                                password,
                                            },
                                            { withCredentials: true }
                                        );
                                        console.log("cookie", document.cookie);
                                        if (document.cookie) {
					    setCookies('true');
                                            router.push("/dashboard");
                                        }
                                    } catch (error:any) {
                                        if (error.response) {
                                            alert(error.response.data.message || "Login failed");
                                        } else if (error.request) {
                                            alert(
                                                "No response from the server. Please try again later."
                                            );
                                        } else {
                                            alert(
                                                "An unexpected error occurred. Please try again."
                                            );
                                        }
                                    }
                                }}
                                size="big"
                            >
                                Login
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

