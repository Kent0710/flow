import Main from "@/components/main"

const UserManual = async () => {
    return (
        <div className="flex justify-center items-center w-[95vw]">
            <Main className="w-[50rem]" headerText="Introduction" description="
                Welcome to Flow's user manual!
            ">
                <article className="flex flex-col gap-3 border-t pt-10">
                    <h2 className="font-bold text-lg">
                        What is Flow?
                    </h2>
                    <p className="leading-[1.5rem]">
                        Flow is a project management application built with Next.JS. It is integrated
                        by popular libraries such as Next-Auth for security, MongoDB for the database, 
                        Prisma as the ORM, React-Flow for the node feature, Shadcn-UI and Tailwind-CSS 
                        for the styling
                    </p>
                </article>
                <section className="flex flex-col gap-10 border-t py-10">
                    <ArticleBox
                        title="Creating a project"
                        content="
                            Create a new project with Flow by creating the plus icon
                            at the sidebar. Give your project a name and a description.
                            You will be redirected to your newly created project. You will
                            see a blue-colored node. You can edit its content but you can not
                            delete it. Every project needs to have at least one node inside.
                        "
                    />
                    <ArticleBox
                        title="Deleting a project"
                        content="
                            To delete a project, go to the dashboard page. All of your projects will appear
                            on the first section. Click on the delete button associated with the project 
                            that you want to delete.
                        "
                    />
                    <ArticleBox
                        title="Adding a node"
                        content="
                            To add a node, open a project. Hover anywhere and make sure no nodes is
                            blocking the area. Right-click to open the menu and click the add button.
                        "
                    />
                    <ArticleBox
                        title="Changing a node name"
                        content="
                            To change a node name, click on to the center area of the node then start typing.
                            Take note that newly added nodes are the only ones what you can edit. The default
                            node is not available for editing.
                        "
                    />
                    <ArticleBox
                        title="Opening a node"
                        content="
                            To open a node, hover over the node that you want to open. Click the door icon besides
                            the node name.
                        "
                    />
                    <ArticleBox
                        title="Pinning a node"
                        content="
                            To pin a node to your dashboard, hover your cursor on the node that you want to 
                            pin then right-click. A menu will open and click the delete button.
                        "
                    />
                    <ArticleBox
                        title="Unpinning a node"
                        content="
                            To unpin a node, go to the dashboard page. All of your pinned nodes will appear
                            on the second section. Click on the unpin button associated with the node that 
                            you want to unpin.
                        "
                    />
                    <ArticleBox
                        title="Deleting a node"
                        content="
                            To delete a node, open the project where the ndoe is located. Hover your
                            cursor on the node that you want to delete then right-click.
                            A menu will open and click the delete button.
                        "
                    />
                </section>
            </Main>
        </div>
    )
};

interface ArticleBoxProps {
    title : string;
    content : string;
}
export const ArticleBox : React.FC<ArticleBoxProps> = ({
    title,
    content
}) => {
    return (
        <div className="flex flex-col gap-3">
                <h2 className="font-bold text-lg text-blue-500">
                        {title}
                    </h2>
                    <p className="leading-[1.5rem]">
                        {content}
                    </p>
        </div>
    )
};