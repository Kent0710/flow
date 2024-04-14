'use server'

import prisma from "@/lib/prisma";

export default async function updateNodeName(nodeId : string, nodeName : string) {
    try {
        const newNode = await prisma.node.update({
            where : {
                id : nodeId
            },
            data : {
                name : nodeName
            }
        });
        if (!newNode) return null;
        return true;
    } catch (err : any) {
        console.error('SERVER_ERROR (update node name):', err);
        return null;
    } 
};