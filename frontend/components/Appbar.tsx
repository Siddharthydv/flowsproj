"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

import {useCookies} from "@/app/cookiecontext"

export const Appbar = () => {
  const router = useRouter();
  const { cookies, setCookies } = useCookies();

  useEffect(() => {
    if (typeof document !== "undefined") {
      setCookies(document.cookie);
    }
  }, [cookies]);

  return (
    <div className="flex border-b justify-between p-4">
      <div className="flex space-x-20 max-sm:space-x-9">
        <button>
          <div
            className="flex flex-col justify-center text-[2vmax] font-extrabold"
            onClick={() => {
              router.push("/");
            }}
          >
            FLOWS
          </div>
        </button>
      </div>
      <div className="flex items-center">
        <div className="pr-4">
          {cookies && (
            <LinkButton
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Flows
            </LinkButton>
          )}
        </div>
        <div className="pr-4">
          {cookies && (
            <LinkButton
              onClick={() => {
                router.push("/flowRun");
              }}
            >
              FlowRuns
            </LinkButton>
          )}
        </div>
        <div className="pr-4">
          {!cookies && (
            <LinkButton
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </LinkButton>
          )}
          {cookies && (
            <PrimaryButton
              onClick={() => {
                Logout(router, setCookies);
              }}
            >
              Logout
            </PrimaryButton>
          )}
        </div>
        {!cookies && (
          <PrimaryButton
            onClick={() => {
              router.push("/signup");
            }}
          >
            Signup
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};


function Logout(router:any,setCookies:any){
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  setCookies(null);
router.push("/")
}
