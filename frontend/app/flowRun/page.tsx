"use client"
import { useDebugValue, useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { zapRunsType } from "../config";
export default function ZapRun(){
    const [zapRuns,setzapRuns]=useState<zapRunsType[]>();
    useEffect(()=>{
        async function getRuns(){
            const response=await axios.get(`${BACKEND_URL}/api/v1/flow/flowRuns`,{
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                withCredentials:true
            })
            console.log(response)
            setzapRuns(response.data.zapRuns)
        }
        getRuns();
    },[])
   return <div className="flex flex-col px-4 md:px-8 mt-10 md:mt-28 max-w-screen-lg w-full border  mx-auto">
    <div className="hidden md:flex border boder- pb-2">
        <div className="flex-1 font-medium">Name</div>
        {/* <div className="flex-1">ID</div> */}
        <div className="flex-1 font-medium">Created at</div>
        <div className="flex-1 font-medium">MetaData</div>
    </div>
    {zapRuns?.map((z) => (
        <div
            key={z.zap.id}
            className="flex flex-col md:flex-row items-start md:items-center border-b py-4 space-y-4 md:space-y-0 overflow-hidden"
        >
            {/* <div className="flex-1 flex">
                <img src={z.trigger.type.image} className="w-[30px] h-[30px]" alt="Trigger" />
                {z.actions.map((x, index) => (
                    <img key={index} src={x.type.image} className="w-[30px] h-[30px]" alt="Action" />
                ))}
            </div> */}
            <div className="flex-1 break-words"><div className="text-black font-bold md:hidden">ID:-</div>{z.zap.id}</div>
            <div className="flex-1">
            <div className="text-black font-bold md:hidden">DATE AND TIME:-</div>
                {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }).format(new Date(z.createdAt))}
                            </div>
            <div className="text-black font-bold md:hidden">METADATA:-</div>
            <div className="md:flex-1 overflow-y-scroll  h-20 break-all">
                {JSON.stringify(z.metadata)}
            </div>
            {/* <div className="flex-1">
                <LinkButton
                    onClick={() => {
                        router.push("/zap/" + z.id);
                    }}
                >
                    Go
                </LinkButton>
            </div> */}
        </div>
    ))}
</div>}
