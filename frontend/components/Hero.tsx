"use client"
import { useRouter } from "next/navigation"
import { Feature } from "./Feature"
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/SecondaryButton"
import Image from "next/image"
import gmailimg from './mail.png'
import githubimg from './git.png'
import slackimg from './slk.png'
export const Hero = () => {
    const router = useRouter();
    return <div className="flex-col h-screen dborder border-green-500 space-y-12 max-sm:space-y-6">
        <div className="flex-col justify-center">
            <div className=" text-[3vmax] font-bold text-center pt-8 ">
                Automate Things<br/>Invest your Time Rightfully.  
            </div>
            <div className="text-[1vmax] font-normal text-center pt-8 max-sm:text-[1.4vmax] ">
                This app provides you the service to automate the<br/> process of updates leveraging the power of webhooks .
            </div>
        </div>
        {/* <div className="flex justify-center pt-2">
          
        </div> */}

        <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={() => {
                    if(!localStorage.getItem('token'))
                    router.push("/signup")
                    else
                    router.push('/dashboard')
                }} size="big">Get Started free</PrimaryButton>
                {/* <div className="pl-4">
                    <SecondaryButton  onClick={() => {}} size="big">Contact Sales</SecondaryButton>
                </div> */}
            </div>
        </div>

        <div className=" max-sm:flex flex-col   dborder border-black space-y-24 p-4 max-sm:space-y-16" >
            <div className=" flex dborder space-x-14 justify-center min-sm:flex-col ">
                <Image src={githubimg} alt="github"   className="w-[9vmax]"/>
                <Image src={slackimg} alt="github" className="w-[9vmax]"/>
                <Image src={gmailimg} alt="github" className="w-[9vmax]"/>
            </div>
            <div className="flex dborder border-red-500 justify-center space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-4 max-sm:items">
                <Feature title={"Raise Issues"} subtitle={"for core features"} />
                <Feature title={"Send Gmails"} subtitle={"when a new issue is raised "} />
                <Feature title={"Send Slack Notificatons"} subtitle={"on the specified channels"} />
            </div>
           
        </div>
    </div>
}