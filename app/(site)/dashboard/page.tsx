import { twMerge } from "tailwind-merge";

import { boxClassname } from "@/lib/utils";

import ProjectBox from "@/components/project-box";
import Main, { MainSection } from "@/components/main";

import { Skeleton } from "@/components/ui/skeleton"

import getSessionUserProjects from "@/actions/getSessionUserProjects";
import getPinnedNodes from "@/actions/getPinnedNodes";

import Link from "next/link";

export default async function App() {
    const projects = await getSessionUserProjects();
    const nodes = await getPinnedNodes();

    return (
        <Main headerText="Dashboard" description="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        ">
            <MainSection title="Recent Projects">
                {projects ? (
                    projects.length > 0 ? (
                        projects.slice(0, 6).map((proj) => (
                            <ProjectBox 
                                key={proj.id}
                                title={proj.name}
                                description={proj.description}
                                status={proj.status}
                            />
                        ))
                    ) : (
                        <Link href={"/projects/createNew"} className="w-[10rem] text-center bg-blue-700 text-white py-2 text-primary-foreground font-bold rounded-xl hover:opacity-70">
                            Create new
                        </Link>
                    )
                ) : (
                    <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                    </>
                )}
                {projects!.length !== 0 && (
                    <Link href={"/projects"} className="text-blue-500 hover:underline">See all projects</Link>
                )}
            </MainSection>
            <MainSection title="Pinned Nodes">
                {nodes ? (
                    nodes.length > 0 ? (
                        nodes.slice(0, 6).map((node) => (
                            <NodeBox 
                                key={node.id}
                                name={node.name}
                                projectName={node.name}
                            />
                        ))
                    ) : (
                        <p className="opacity-70">
                            Your pinned nodes will appear here. Open a project and pin a node.
                        </p>
                    )
                ) : (
                    <>
                        <NodeSkeleton />
                        <NodeSkeleton />
                        <NodeSkeleton />
                    </>
                )}
            </MainSection>
        </Main>
    )
}

import { PinOff } from "lucide-react";
import { updateUnpinnedNodes } from "@/actions/updatePinNodes";

interface NodeBoxProps {
    name : string;
    projectName : string;
    className? : string;
}
const NodeBox : React.FC<NodeBoxProps> = ({
    name,
    projectName,
    className
}) => {
    return (
        <div className={twMerge(`${boxClassname} ${className} w-[18rem] p-2`)}>
            <form className="text-right w-full flex" action={async () => {
                        'use server'
                        await updateUnpinnedNodes(name).then((res) => console.log(res))
                    }
                }
            >
                <button type="submit">
                    <PinOff size={35} 
                        className="hover:bg-primary-foreground hover:bg-opacity-70 p-2 rounded-xl text-blue-500" />
                </button>
            </form>
            <div className="px-8 pb-8">
                <h3 className="font-bold">
                    {name}
                </h3>
                <small>
                    {projectName}
                </small>
            </div>
        </div>
    )
};

const ProjectSkeleton = () => {
    return (
        <div className="w-[25rem] p-10 rounded-xl bg-secondary animate-pulse flex flex-col gap-3 py-12">
        <section className="flex flex-col gap-1">
            <Skeleton className="w-[10rem] h-[1rem] rounded-full bg-accent" />
            <Skeleton className="w-[3rem] h-[0.5rem] rounded-full bg-accent" />
        </section>
        <Skeleton className="w-full h-[1
            rem] rounded-full bg-accent" />
        </div>
    )
};

const NodeSkeleton = () => {
    return (
        <div className="w-[18rem] p-10 rounded-xl bg-secondary animate-pulse flex flex-col gap-1 py-12">
            <Skeleton className="w-[10rem] h-[1rem] rounded-full bg-accent" />
            <Skeleton className="w-[4rem] h-[0.5rem] rounded-full bg-accent" />
        </div>
    )
}