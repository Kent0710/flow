'use server'

import getSessionUser from "./getSessionUser";
import prisma from "@/lib/prisma"

export default async function getSessionUserProjects() {
    try {
        const sessionUser = await getSessionUser();

        if (!sessionUser) return null;

        const projects = await prisma.project.findMany({
            where : {
                usersIds : {
                    has : sessionUser.id
                }
            }
        });
        if (!projects) return null;
        return projects
    } catch (err : any) {
        console.error('SERVER_ERROR (get session user projects):', err);
        return null;
    } 
};