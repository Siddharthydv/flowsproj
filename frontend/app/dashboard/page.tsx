"use client"
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    "createdAt":string,
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/flow`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            withCredentials:true
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export default function Dashboard() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return <div>
    {/* <Appbar /> */}
    <div className="flex justify-center pt-8 px-4">
        <div className="max-w-screen-lg w-full">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center pr-0 md:pr-8">
                <div className="text-2xl font-bold mb-4 md:mb-0">
                    My Flows
                </div>
                <DarkButton onClick={() => {
                    router.push("/flow/create");
                }}>Create</DarkButton>
            </div>
        </div>
    </div>
    {loading ? "Loading..." : (
        <div className="flex justify-center">
            <ZapTable zaps={zaps} />
        </div>
    )}
</div>

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return (
        <div className="p-4 md:p-8 max-w-screen-lg w-full overflow-x-auto">
            <div className="hidden md:flex border-b pb-2">
                <div className="flex-1 font-medium">Name</div>
                <div className="flex-1 font-medium">ID</div>
                <div className="flex-1 font-medium">Created at</div>
                <div className="flex-1 font-medium">Webhook URL</div>
                <div className="flex-1 font-medium">Go</div>
            </div>
            {zaps.map(z => (
                <div
                    key={z.id}
                    className="flex flex-col md:flex-row items-start md:items-center border-b py-4 space-y-2 md:space-y-0"
                >
                    <div className="flex-1 flex items-center space-x-2">
                        <img
                            src={z.trigger.type.image}
                            className="w-[30px] h-[30px]"
                            alt="Trigger"
                        />
                        {z.actions.map((x, index) => (
                            <img
                                key={index}
                                src={x.type.image}
                                className="w-[30px] h-[30px]"
                                alt="Action"
                            />
                        ))}
                    </div>
                    <div className="flex-1">{z.id}</div>
                    <div className="flex-1">
                        {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            timeZone: "IST", // Adjust the time zone as needed
                        }).format(new Date(z.createdAt))}
                    </div>
                    <div className="flex-1 break-words">
                        {`${HOOKS_URL}/hooks/catch/1/${z.id}`}
                    </div>
                    <div className="flex-1">
                        <LinkButton
                            onClick={() => {
                                router.push("/flow/" + z.id);
                            }}
                        >
                            Go
                        </LinkButton>
                    </div>
                </div>
            ))}
        </div>
    );
}

}