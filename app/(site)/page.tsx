'use client'

import { Network } from "lucide-react"

import { signIn } from "next-auth/react"

export default function WelcomePage() {
    return (
        <div className="flex w-screen h-screen  justify-center gap-[15rem] items-center pb-[5rem]">
            <section>
                <h1 className="text-[15rem] font-bold">
                    Flow
                </h1>
                <p className="text-xl">
                    A node based project management application.
                </p>
                    <button type="submit" onClick={() => signIn('auth0', {callbackUrl : "/dashboard"})} className=" mt-[5rem] bg-blue-700 text-white font-bold py-2 px-20 rounded-xl hover:opacity-70">
                        Get started
                    </button>
            </section>
            <Network size={550} />
        </div>
    )
};