'use server'
import { pusherServer } from './../lib/pusher';

import prisma from "@/lib/prisma";
import getSessionUser from "./getSessionUser";
import { revalidatePath } from "next/cache";


export default async function createMessage(projectId : string, formData : FormData) {
    try {
        const sender = await getSessionUser();

        if (!sender) return null;

        const content = formData.get('content')?.toString();

        if (!content) return null;

        const message = await prisma.message.create({
            data : {
                content : content,
                projectId : projectId,
                senderId : sender.id
            },
            include : {
                sender : true,
                project : {
                    include : {
                        user : true
                    }
                }
            }
        });

        const projectMembers = message.project.user.map(member => member.name) || [];
        for (let i = 0; i < projectMembers.length; i++) {
            await pusherServer.trigger(`new-message-${projectMembers[i]}`, 'new-message', {
                newMessage : message
            })
        }
        revalidatePath("/projects/[projectName]/c/[projectId]", 'page');
        return message;
    } catch (err : any) {
        console.error('SERVER_ERROR (create node):', err);
        return null;
    } 
};