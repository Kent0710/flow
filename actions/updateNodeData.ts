'use server'

import prisma from "@/lib/prisma";

export async function updateNodeTitle(nodeId : string, newTitle : string) {
    try {
        const node = await prisma.node.update({
            where : {
                id : nodeId
            },
            data : {
                title : newTitle
            }
        });
        if (!node) return null;
        return node.title;
    } catch (err : any) {
        console.error('SERVER_ERROR (update node title):', err);
        return null;
    } 
};

export async function updateNodeContent(nodeId : string, newContent : string) {
    try {
        const node = await prisma.node.update({
            where : {
                id : nodeId
            },
            data : {
                content : newContent
            }
        });
        if (!node) return null;
        return node.content;
    } catch (err : any) {
        console.error('SERVER_ERROR (update node content):', err);
        return null;
    } 
};