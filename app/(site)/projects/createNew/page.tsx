import Main from "@/components/main"

import { TextLabel } from "@/components/sidebar"

import createProject from "@/actions/createProject"

import { redirect } from "next/navigation"

import SubmitButton from "@/components/submit-button"

export default async function CreateNewProjectPage() {
    const createProjectHandler = async (formData : FormData) => {
        'use server'
        const newProject = await createProject(formData);
        if (newProject) redirect(`/projects/${newProject}`)
    }

    return (
        <Main  headerText="New Project" description="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        ">
            <form className="flex flex-col gap-3 w-[50rem]" action={createProjectHandler}>
                <TextLabel disabled={false} label="Name" id="new-project-name" name="new-project-name" required={true}/>
                <TextLabel disabled={false} label="Description"  id="new-project-description" name="new-project-description" required={true}/>
                <SubmitButton text="Create project" onSubmitText="Creating project..." />
            </form>
        </Main>
    )
};