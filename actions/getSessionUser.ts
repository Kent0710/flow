'use server'

import prisma from "@/lib/prisma";
import getSession from "./getSession";

export default async function getSessionUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) return null;

        const user = await prisma.user.findUnique({
            where : {
                email : session.user.email
            },
            include : {
                projects : true,
                pinnedNodes : {
                    include : {
                        project : true
                    }
                }
            }
        });

        if (!user) return null;

        return user;
    } catch (err : any) {
        console.error('SERVER_ERROR (get session user):', err);
        return null;
    } 
};