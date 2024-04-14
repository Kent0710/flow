'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function addUsers(projectName : string, addedUsers : any[], members : any[]) {
    try {
        const addedUsersIds = [];
        for (let i = 0; i < addedUsers.length; i++) {
            addedUsersIds.push(addedUsers[i].id);
        }

        const membersIds = addedUsersIds;
        for (let i = 0; i < members.length; i++) {
            membersIds.push(members[i].id);
        }

        const project = await prisma.project.update({
            where : {
                name : projectName
            },
            data : {
                usersIds : membersIds
            },
            include : {
                user : true
            }
        });
        if (!project) return null;
        revalidatePath("/projects/[projectName]", 'page')
        return project.user;
    } catch (err : any) {
        console.error('SERVER_ERROR (add users):', err);
        return null;
    } 
};