'use client'

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation";

import Link from "next/link";

import {getNodeDataUsingNodeName} from "@/actions/getNodeData";
import {updateNodeTitle, updateNodeContent} from "@/actions/updateNodeData";

import { Skeleton } from "@/components/ui/skeleton"

export default function NodePage() {
    const [node, setNode] = useState({
        title : '',
        id : '',
    });
    const decodedPathname = decodeURI(usePathname())
    const projectName = decodedPathname.split("/")[2];
    const nodeName = decodedPathname.split("/").pop()!;
    useEffect(() => {
        async function getNodeDataHandler() {
            const nodeData = await getNodeDataUsingNodeName(nodeName);
            if(nodeData) {
                setNode(nodeData);
                setTitle(nodeData.title)
                setContent(nodeData.content)
            }
        };
        getNodeDataHandler()
    }, [nodeName])

    const [title, setTitle] = useState('');
    const [debouncingTitleTimer, setDebouncingTitleTimer] = useState<any>(null);
    const handleTitleInput = (e : any) => {
        const newText = e.target.textContent ?? '';
        setDebouncingTitleTimer(clearTimeout(debouncingTitleTimer));
        // Set a new timeout
        const timer = setTimeout(async () => {
            console.log("10 seconds elapsed after typing the last character.");
            const newTitle = await updateNodeTitle(node.id, newText);
        }, 10000);
        // Update the state with the new timer
        setDebouncingTitleTimer(timer);
    }
    const handleTitleBlur = async (e : any) => {
        const newText = e.target.textContent ?? '';
        const newTitle = await updateNodeTitle(node.id, newText);
    }

    const [content, setContent] = useState('');
    const [debouncingContentTimer, setDebouncingContentTimer] = useState<any>(null);
    const handleContentInput = (e : any) => {
        const newText = e.target.textContent ?? '';
        setDebouncingContentTimer(clearTimeout(debouncingContentTimer))
        const timer = setTimeout(async () => {
            console.log("10 seconds elapsed.")
            const newContent = await updateNodeContent(node.id, newText);
        }, 10000);
        setDebouncingContentTimer(timer)
    }
    const handleContentBlur = async (e : any) => {
        const newText = e.target.textContent ?? '';
        const newContent = await updateNodeContent(node.id, newText);
        if (newContent) {
            setContent(newContent)
        }
    }

        return (
            <div className="w-screen h-screen p-5">
                <header className="absolute ">
                    {!projectName ? (
                        <Skeleton className="w-[15rem] h-[1.5rem] rounded-full" />
                    ) : (
                    <p className="text-blue-500"> Projects / <Link className="hover:underline" href={`/projects/${projectName}`}> {projectName} </Link>  / {nodeName} </p>
                )}
            </header>
            <form
                className="p-48 pr-[25rem] pl-[20rem] flex h-screen flex-col gap-5"
            >
                <div
                    onBlur={handleTitleBlur}
                    onInput={handleTitleInput}
                    className="bg-transparent text-6xl font-bold focus:outline-none"
                    id="node-title"
                    suppressContentEditableWarning={true}
                    contentEditable
                >
                    {title || "Untitled"}
                </div>
                <div
                    id="text-area"
                    className={`bg-transparent focus:outline-none text-lg`}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={handleContentBlur}
                    onInput={handleContentInput}
                >
                    {content || "Start typing..."}
                </div>
            </form>
        </div>
    )
};
