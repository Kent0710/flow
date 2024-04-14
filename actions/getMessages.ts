'use server'

import prisma from "@/lib/prisma";

export async function getMessages(projectName : string) {
    try {
        const project = await prisma.project.findUnique({
            where : {
                name : projectName
            },
            include : {
                messages : {
                    include : {
                        sender : true
                    }
                }
            }
        });
        if (!project) return null;
        return project.messages
    } catch (err : any) {
        console.error('SERVER_ERROR (get node data):', err);
        return null;
    } 
};