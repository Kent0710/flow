'use server'

import prisma from "@/lib/prisma";

export default async function getProjectData(projectName : string) {
    try {
        const project = await prisma.project.findUnique({
            where : {
                name : projectName
            },
            include : {
                nodes : true,
                user : true,
            }
        });

        if (!project) return null;

        return project;
    } catch (err : any) {
        console.error('SERVER_ERROR (get project data):', err);
        return null;
    } 
};