'use server'

import prisma from "@/lib/prisma";
import getSessionUser from "./getSessionUser";

export default async function createNode(projectName : string, nodeName : string, xPos : number, yPos : number) {
    try {
        const project = await prisma.project.findUnique({
            where : {
                name : projectName
            }
        });

        if (!project) return null;

        const user = await getSessionUser();
        if (!user) return null;

        const newNode = await prisma.node.create({
            data :{
                type : 'textUpdater',
                xPos : xPos,
                yPos : yPos,
                name : nodeName,
                title : 'Untitled',
                content : '',
                projectId : project.id,
            }
        });
        
        if (!newNode) return null;
        return newNode;
    } catch (err : any) {
        console.error('SERVER_ERROR (create node):', err);
        return null;
    } 
};