'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteNode(nodeId : string) {
    try {
        const node = await prisma.node.delete({
            where : {
                id : nodeId
            }
        });

        if (!node) return null;
        return true;
    } catch (err : any) {
        console.error('SERVER_ERROR (node id):', err);
        return null;
    } 
};