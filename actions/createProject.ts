'use server'

import prisma from "@/lib/prisma";
import getSessionUser from "./getSessionUser";
import createNode from "./createNode";
import { revalidatePath } from "next/cache";

export default async function createProject(formData : FormData) {
    try {
        const sessionUser = await getSessionUser();
        if (!sessionUser) return null;

        const rawFormData = {
            name : formData.get('new-project-name')!.toString(),
            description : formData.get('new-project-description')!.toString(),
        }

        const newProject = await prisma.project.create({
            data : {
                name : rawFormData.name,
                description : rawFormData.description,
                status: 'Not started',
                usersIds : [sessionUser.id],
                ownerId : sessionUser.id,
                nodes : {
                    create : [
                        {
                            type : 'textUpdater',
                            xPos : 0 + 255,
                            yPos : 0 + 255,
                            name : rawFormData.name,
                            title : 'Untitled',
                            content : '',
                        }
                    ]
                }
            }
        })
        
        if (!newProject) return null;

        revalidatePath("/dashboard")
        return newProject.name;

    } catch (err : any) {
        console.error('SERVER_ERROR (create project):', err);
        return null;
    } 
};