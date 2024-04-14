'use server'

import getSessionUser from "./getSessionUser";
import prisma from "@/lib/prisma"

export default async function getPinnedNodes() {
    try {
        const sessionUser = await getSessionUser();

        if (!sessionUser) return null;

        const nodes = await prisma.node.findMany({
            where : {
                pinnersIds : {
                    has : sessionUser.id
                }
            }
        })
        if (!nodes) return null;
        return nodes;
    } catch (err : any) {
        console.error('SERVER_ERROR (get pinned nodes):', err);
        return null;
    } 
};