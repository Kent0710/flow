'use server'
import { pusherServer } from './../lib/pusher';

import prisma from "@/lib/prisma";
import getSessionUser from "./getSessionUser";
import { revalidatePath } from "next/cache";

export default async function deleteMessage(messageId : string) {
    try {
        const message = await prisma.message.delete({
            where : {
                id : messageId
            }
        });
        if (!message) return null;

        const projectId = message.projectId;
        const project = await prisma.project.findUnique({
            where : {
                id : projectId
            },
            include : {
                user : true,
            }
        });

        if (!project) return null;

        const projectMembers = project.user.map(member => member.name) || [];
        for (let i = 0; i < projectMembers.length; i++) {
            await pusherServer.trigger(`delete-message-${projectMembers[i]}`, 'delete-message', {
                newMessage : message
            })
        }

        revalidatePath("/projects/[projectName]/c/[projectId]", 'page');
        return message;
    } catch (err : any) {
        console.error('SERVER_ERROR (delete message):', err);
        return null;
    } 
};