'use server'

import prisma from "@/lib/prisma";

export async function getNodeDataUsingNodeId(nodeId : string) {
    try {
        const node = await prisma.node.findUnique({
            where : {
                id : nodeId
            },
            include : {
                project : true,
            }
        });

        if (!node) return null;
        return node;
    } catch (err : any) {
        console.error('SERVER_ERROR (get node data):', err);
        return null;
    } 
};

export async function getNodeDataUsingNodeName(nodeName : string) {
    try {
        const node = await prisma.node.findUnique({
            where : {
                name : nodeName
            },
            include : {
                project : true
            }
        });

        if (!node) return null;
        return node;
    } catch (err : any) {
        console.error('SERVER_ERROR (get node data):', err);
        return null;
    } 
};