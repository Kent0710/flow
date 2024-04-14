import { boxClassname } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

import Link from "next/link";

import { Trash } from "lucide-react";
import { Pencil } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog";

  import { TextLabel } from "./sidebar";

import deleteProject from "@/actions/deleteProject";
import  updateProject  from "@/actions/updateProject";

interface ProjectBoxProps {
    title : string;
    description : string;
    status : string;
    className? : string;
}
const ProjectBox : React.FC<ProjectBoxProps> = async ({
    title,
    description,
    status,
    className
}) => {
    return (
        <div
            className={twMerge(`${className} ${boxClassname} gap-0 w-[15vw] p-2`)}
        >
            <form className="text-right w-full flex flex-row-reverse" action={async () => {
                'use server'
                await deleteProject(title)
            }}>
                <button type="submit">
                    <Trash size={35} 
                        className="hover:bg-primary-foreground hover:bg-opacity-70 p-2 rounded-xl text-red-500" />
                </button>
                <Dialog>
            <DialogTrigger>
                <Pencil size={35} 
                        className="hover:bg-primary-foreground hover:bg-opacity-70 p-2 rounded-xl text-blue-500" />
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-center font-bold text-lg">Edit Project</DialogTitle>
                <DialogDescription className="text-center">
                    Lorem ipsum dolor sit amet, consectetur 
                </DialogDescription>
                <form className="flex flex-col gap-3" action={async (formData : FormData) => {
                    'use server'
                    await updateProject(title, description, status, formData);
                }}>
                    <TextLabel defaultValue={title} placeholder={title} disabled={false} label="Name" id="updated-project-name" name="updated-project-name"/>
                    <TextLabel defaultValue={description} placeholder={description} disabled={false} label="Description"  id="updated-project-description" name="updated-project-description"/>
                    <section className="flex items-center justify-between">
                    <select id="proj-status" name="proj-status" defaultValue={"Not started"} className="w-[180px] p-2 rounded-xl bg-transparent border ring-0 outline-none text-sm">
                        <option value="Not started" id="not-started" className="bg-secondary">Not started</option>
                        <option value="In progress" id="in-progress" className="bg-secondary">In progress</option>
                        <option value="Completed" id="completed " className="bg-secondary">Completed</option>
                    </select>
                <DialogClose type="submit" className="w-[10rem] text-sm text-white bg-blue-700 py-2 text-primary-foreground font-bold rounded-xl hover:opacity-70">
                    Confirm changes
                </DialogClose>
                    </section>
            </form>
            </DialogHeader>
            </DialogContent>
        </Dialog>
                
            </form>
            <Link
                href={`/projects/${title}`}
                className="px-8 pb-8"
            >
                <div>
                    <h3 className="font-bold">
                        {title}
                    </h3>
                    <small>
                        {status}
                    </small>
                </div>
                <p className="opacity-70 truncate">
                    {description}
                </p>
            </Link>
        </div>
    )
};

export default ProjectBox;