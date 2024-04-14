'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function removeUser(userId : string, members : any[], projectName : string) {
    try {
        const ids = [];
        for (let i =0; i < members.length; i++) {
            ids.push(members[i].id);
        }
        const filteredIds = ids.filter(id => id !== userId)

        const project = await prisma.project.update({
            where : {
                name : projectName
            },
            data : {
                usersIds : filteredIds
            },
            include : {
                user : true
            }
        });

        if (!project) return null;
        revalidatePath("/projects/[projectName]", 'page')
        return project.user;
    } catch (err : any) {
        console.error('SERVER_ERROR (remove users):', err);
        return null;
    } 
};