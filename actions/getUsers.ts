'use server'

import prisma from "@/lib/prisma";
import getSession from "./getSession";

export default async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        if (!users) return null;
        return users
    } catch (err : any) {
        console.error('SERVER_ERROR (get users):', err);
        return null;
    } 
};