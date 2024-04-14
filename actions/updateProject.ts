'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function updateProject(projectName : string, description : string, status : string, formData : FormData) {
    try {
        const rawFormData = {
            name : formData.get('updated-project-name')?.toString(),
            description : formData.get('updated-project-description')?.toString(),
            status : formData.get('proj-status')?.toString(),
        }

        const project = await prisma.project.update({
            where : {
                name : projectName
            },
            data : {
                name : rawFormData.name || projectName,
                description : rawFormData.description || description,
                status : rawFormData.status || status,
                nodes : {
                    update : {
                        where : {
                            name : projectName
                        },
                        data : {
                            name : rawFormData.name || projectName
                        }
                    }
                }
            },
        });

        if (!project) return null;
        revalidatePath("/dashboard")
        return true;
    } catch (err : any) {
        console.error('SERVER_ERROR (edit project):', err);
        return null;
    } 
};