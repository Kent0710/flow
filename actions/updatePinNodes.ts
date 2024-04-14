'use server'

import prisma from "@/lib/prisma";
import getSessionUser from "./getSessionUser";
import { revalidatePath } from 'next/cache';

export async function updatePinnedNodes(nodeName : string) {
    try {
        const user = await getSessionUser();
        if (!user) return null;

        const node = await prisma.node.update({
            where : {
                name : nodeName
            },
            data : {
                pinnersIds : {
                    push : user.id
                }
            }
        });
        if (!node) return null;
        revalidatePath("/")
        return true;
    } catch (err : any) {
        console.error('SERVER_ERROR (update pinned nodes):', err);
        return null;
    } 
};

export async function updateUnpinnedNodes(nodeName : string) {
    try {
        const sessionUser = await getSessionUser()
        if (!sessionUser) return null;

        const user = await prisma.user.update({
            where : {
                id : sessionUser.id,
            },
            data : {
                pinnedNodes : {
                    disconnect : {
                        name : nodeName
                    }
                }
            }
        });

        if (!user) return null;
        
        revalidatePath("/dashboard")

        return true;
    } catch (err : any) {
        console.error('SERVER_ERROR (update pinned nodes):', err);
        return null;
    } 
};