'use client'

import { ScrollArea } from "@/components/ui/scroll-area"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getMessages } from "@/actions/getMessages";
import createMessage from "@/actions/createMessage";

import { pusherClient } from "@/lib/pusher";

export default function ProjectChatsPage() {
    const pathname = usePathname();
    const decodedPathname = decodeURI(pathname)
    const projectName = decodedPathname.split("/")[2];
    const projectId = decodedPathname.split("/")[4];

    const [messages, setMessages] = useState<any[]>([{}]);
    const [sessionUsername, setSessionUsername] = useState<any>();
    const [renderReady, setRenderReady] = useState(false)
    useEffect(() => {
        async function getMessagesHandler() {
            const rawMessages = await getMessages(projectName);
            if (!rawMessages) return;
            
            setMessages(rawMessages)

            const user = await getSessionUser();
            if (!user) return;
            setSessionUsername(user.name)

            setRenderReady(true)
        }
        getMessagesHandler();


    }, [projectName, sessionUsername])

    useEffect(() => {
        const channel = pusherClient.subscribe(`new-message-${sessionUsername}`);
        const channel2 = pusherClient.subscribe(`delete-message-${sessionUsername}`);

        channel.bind(`new-message`, (data : any) => {
            setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            console.log(data.newMessage)
        })

        channel2.bind(`delete-message`, (data : any) => {
            const newMessages = messages.filter(message => message.id !== data.newMessage.id)
            setMessages(newMessages)
        })

        return () => {
            pusherClient.unsubscribe(`new-message-${sessionUsername}`);
            pusherClient.unbind('new-message')
            pusherClient.unsubscribe(`delete-message-${sessionUsername}`);
            pusherClient.unbind('delete-message')
            
        }
    }, [messages, sessionUsername])

    if (!renderReady) return <div>loading</div>

    return (
        <div className="flex flex-col px-[18vw] py-14 w-screen h-screen">
            <div className="h-full w-full rounded-md border p-10 overflow-y-auto">
                {messages && (
                    messages.map((message : any) => (
                        <MessageBox     
                            key={message.id}
                            senderName={message.sender.name}
                            content={message.content}
                            sessionUsername={sessionUsername}
                            id={message.id}
                        />
                    ))
                )}
            </div>
            <form className="w-full flex" action={async (formData : FormData) => {
                await createMessage(projectId, formData)
            }}>
                <input id='content' name="content" placeholder="Type your message here..." className="basis-[90%] bg-secondary-foreground text-secondary font-semibold rounded-b-xl resize-none p-5 focus:outline-none" />
                <button type="submit" className="w-[10rem] bg-blue-700 text-sm py-2 text-white font-bold rounded-b-xl hover:opacity-70">
                    Send message
                </button>
            </form>
        </div>
    )
};

import getSessionUser from "@/actions/getSessionUser";
import { twMerge } from "tailwind-merge";

import { EllipsisVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import deleteMessage from "@/actions/deleteMessage";
  

interface MessageBoxProps {
    senderName : any;
    content : string;
    sessionUsername : string;
    id : string;
}
const MessageBox : React.FC<MessageBoxProps> = ({
    senderName,
    content,
    sessionUsername,
    id
}) => {
    return (
        <div className={twMerge("flex gap-2 m-5 items-center", sessionUsername === senderName && 'flex-row-reverse')}>
            {sessionUsername === senderName && (
                <DropdownMenu>
    <DropdownMenuTrigger>
    <EllipsisVertical size={40} className="hover:bg-secondary hover:bg-opacity-70 p-2 rounded-xl hover:cursor-pointer"/>

    </DropdownMenuTrigger>
    <DropdownMenuContent>
            <form className="py-1 px-2 hover:bg-accent text-sm" action={async() => {
                await deleteMessage(id)}}>
                <button type="submit">Delete</button>
            </form>
    </DropdownMenuContent>
    </DropdownMenu>
            )}
            <h1 className="font-bold">
                {senderName}
            </h1>
            <p className="bg-blue-500 py-2 px-7 rounded-full">
                {content}
            </p>
        </div>
    )
};