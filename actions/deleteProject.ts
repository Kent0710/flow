'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteProject(projectName : string) {
    try {
        const project = await prisma.project.delete({
            where : {
                name : projectName
            }
        });

        if (!project) return null;
        
        revalidatePath("/dashboard")
        return true;
    } catch (err : any) {
        console.error('SERVER_ERROR (deleting project):', err);
        return null;
    } 
};