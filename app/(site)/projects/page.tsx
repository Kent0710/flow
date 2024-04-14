import Main from "@/components/main"

import ProjectBox from "@/components/project-box"
import { MainSection } from "@/components/main"

import getSessionUserProjects from "@/actions/getSessionUserProjects"

export default async function ProjectsPage() {
    const projects = await getSessionUserProjects();

    return (
        <Main headerText="Projects" description="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        ">
            <MainSection title="Your Projects"  >
                {projects!.map((proj) => (
                    <ProjectBox 
                        key={proj.id}
                        title={proj.name}
                        description={proj.description}
                        status={proj.status}
                    />
                ))}
            </MainSection>
        </Main>
    )
};
