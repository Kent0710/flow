'use client'

import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Home } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { BookText } from "lucide-react";
import { FolderTree } from "lucide-react";
import { Network } from "lucide-react";
import { UserRound } from "lucide-react";
import { LogOut } from "lucide-react";

import { twMerge } from "tailwind-merge";

import { useMemo } from "react";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname(); 
    const routes = useMemo(() => [
        {
            icon : Home,
            label : "Dashboard",
            href : "/dashboard",
            active : pathname === "/dashboard"
        }, 
        {
            icon : SquarePlus,
            label : "New project",
            href : "/projects/createNew",
            active : pathname === "/projects/createNew"
        },
        {
            icon : FolderTree,
            label : "Projects",
            href : "/projects",
            active : pathname === "/projects"
        },
    ], [pathname])

    return (
        <div className="border bg-secondary w-[5rem] to-pink-600 h-fulltext-sm" >
            <main className="p-4 flex flex-col gap-1">
                <section className="flex flex-col gap-1">
                    {routes.map((route) => (
                        <SidebarNav key={route.label} icon={route.icon} text={route.label} active={route.active} href={route.href} />
                    ))}
                </section>
                <section className="flex flex-col w-[5rem] gap-2">
                    <UserManual />
                    <ThemeToggle />
                    <AccountToggle />
                    <Logout />
                </section>
            </main>
        </div>
    )
};

export default Sidebar;

interface SidebarNavProps {
    icon : any;
    text : string;
    active : boolean;
    href : string;
    type? : string;
}
const SidebarNav : React.FC<SidebarNavProps> = ({
    icon,
    text,
    active,
    href,
    type
}) => {
    if (text === "Search") active = false;

    return (
        <Link href={href} >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>            
                        <Icon icon={icon} active={active}/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{text}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Link>
    )
};

import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

const ThemeToggle = () => {
    const { setTheme, theme } = useTheme()

    const handleThemeClick = () => {
        if (theme === 'light') setTheme('dark');
        if (theme === 'dark') setTheme('light');
    }

    return (
        <>
            {theme === 'light' ? (
                <Icon icon={Sun} onClick={handleThemeClick} />
            ) : (
                <Icon icon={Moon} onClick={handleThemeClick} />
            )}
        </>
    )
};

const AccountToggle = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Icon icon={UserRound} />
            </DialogTrigger>
            <DialogContent>
            <DialogHeader className="border-b pb-5">
                <DialogTitle>Your Account</DialogTitle>
                <DialogDescription>
                    Lorem ipsum dolor sit amet, consectetur 
                </DialogDescription>
            </DialogHeader>
                <Account />
            </DialogContent>
        </Dialog>
    )
}

import { useSession } from "next-auth/react";
const Account = () => {
    const { data: session } = useSession()
    return (
        <section className="flex flex-col gap-3 px-5">
            <TextLabel disabled={true} label="Email" placeholder={session?.user?.email || 'null'} id="auth-user-email" name="auth-user-email" />
            <TextLabel disabled={true} label="Username" placeholder={session?.user?.name || 'null'}id="auth-user-name" name="auth-user-name" />
        </section>
    )
};
interface TextLabelProps {
    label : string;
    placeholder? : string;
    type? : string;
    disabled : boolean;
    className? : string;
    id : string;
    name : string;
    required? : boolean;
    defaultValue? : string;
}
export const TextLabel : React.FC<TextLabelProps> = ({
    label,
    placeholder,
    type,
    disabled,
    className,
    id,
    name,
    required,
    defaultValue
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className} `}>
            <p className="font-semibold">
                {label}
            </p>
            <input defaultValue={defaultValue} required={required} id={id} name={name} type={"text" || type} placeholder={placeholder} disabled={disabled} className="bg-accent px-3 py-2 rounded-xl focus:outline-none" />
        </div>
    )
};

import { signOut } from "next-auth/react";
const Logout = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <form action={async () => await signOut({callbackUrl : "/"})}>
                    <TooltipTrigger type="submit" >            
                        <Icon icon={LogOut} />
                    </TooltipTrigger>
                </form>
                <TooltipContent>
                    <p>Log out</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

interface IconProps {
    icon : any;
    active? : boolean;
    onClick? : any;
};
export const Icon : React.FC<IconProps> = ({
    icon : Icon ,
    active,
    onClick
}) => {
    return (
        <Icon 
            size={45} 
            onClick={onClick}
            className={twMerge(` hover:text-blue-500 p-3 rounded-xl bg-opacity-80`, active && "bg-secondary-foreground text-blue-500")} 
        />
    )
}
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArticleBox } from "./article";
const UserManual = () => {
    return (
<Dialog>
  <DialogTrigger>
  <Icon icon={BookText} />

  </DialogTrigger>
  <DialogContent>

    <DialogHeader>
      <DialogTitle>User Manual</DialogTitle>
      <DialogDescription>
        Welcome to Flow user manual!
      </DialogDescription>
    </DialogHeader>
    <ScrollArea className="h-[70vh] rounded-md border p-4">
    <article className="flex flex-col gap-3 pb-10 pt-5">
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
                        title="Creating a workspace"
                        content="
                            Workspace is a special type of project where you can invite other people
                            to collaborate in Flow. Create a new workspace by navigating to your workspaces
                            (clicking the two folders at the sidebar). Click the join or create at the upper
                            right hand corner to get you started.
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
</ScrollArea>

  </DialogContent>

</Dialog>

    )
};