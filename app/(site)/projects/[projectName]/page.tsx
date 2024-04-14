'use client'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { MessageCircleMore } from "lucide-react"
import Link from "next/link"
  import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog"

import React, { useCallback, useEffect, useState } from 'react';

import { ListVideo } from "lucide-react";
import { ListX } from "lucide-react";
import { UserRoundPlus } from "lucide-react";

import { usePathname } from "next/navigation";

import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import LoadingSpinner from "@/components/loading-spinner";

import { randomBytes } from "crypto";

import { useTheme } from "next-themes";
import { useDeleteNode } from "@/hooks/useDeleteNode";

import TextUpdaterNode from "./_components/text-updater-node";

import { useToast } from "@/components/ui/use-toast"

import getProjectData from "@/actions/getProjectData";
import createNode from "@/actions/createNode";
import deleteNode from "@/actions/deleteNode";
import getUsers from "@/actions/getUsers";

import { UserRoundMinus } from "lucide-react";
import addUsers from "@/actions/addUsers";
import removeUser from "@/actions/removeUser";

// declare all the node types created here for memoization
const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

export default function SingleProjectPage() { 
  const {toast} = useToast()

  const [nodesLoading, setNodesLoading] = useState(true)

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // getting the project name
    const pathname = usePathname();
    const decodedPathname = decodeURI(pathname)
    const projectName = decodedPathname.split("/")[2];
    const [projectId, setProjectId] = useState("");
    const [users, setUsers] = useState<any[]>([])
    const [addedUsers, setAddedUsers] = useState<any[]>([{
      id : '',
      name : '',
    }])
    const [members, setMembers] = useState<any[]>([])
    // container for the project's other data
    useEffect(() => {
      // get the project data
      async function getProjData() {
        const proj = await getProjectData(projectName);

        if (proj) {
          const resNodes = proj.nodes;
          setProjectId(proj.id)
          setMembers(proj.user)

          const validatedNodes = [];
          for (let i = 0; i < resNodes.length; i++) {
            let nodeObjHandler = {
              id : '',
              type : '',
              position : {
                x : 0,
                y : 0
              },
              data : {
                id : ''
              }
            }
            nodeObjHandler.id = resNodes[i].id;
            nodeObjHandler.type = resNodes[i].type;
            nodeObjHandler.position.x = resNodes[i].xPos
            nodeObjHandler.position.y = resNodes[i].yPos;
            nodeObjHandler.data.id = resNodes[i].id

            validatedNodes.push(nodeObjHandler);
          };

          setNodes(validatedNodes);
          setNodesLoading(false)

          const users = await getUsers();
          if (!users) return;
          setUsers(users)
        }
      };
      getProjData();
    }, [projectName, setNodes])

    const [toasted, setToasted] = useState(false)
    useEffect(() => {
      if (!toasted) {
          toast({
            title : `Welcome to ${projectName}!`,
          })
          setToasted(true)
      }
    }, [toast, toasted, projectName])


    const {theme} = useTheme()
    const colorValue = theme !== 'light' ? '#eee' : '#111111';

    const onConnect = useCallback(
      (params : any) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );
    
    // delete a node function
    const {nodeId, setNodeId, toDeleteNode, setToDeleteNode} = useDeleteNode()
    useEffect(() => {
      async function deleteNodeHandler() {
        await deleteNode(nodeId);
      }

      if (toDeleteNode) {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
        deleteNodeHandler();
        setToDeleteNode(false)
        setNodeId('')
      }
    }, [toDeleteNode, nodeId, nodes, setToDeleteNode, setNodeId, setNodes])

    // create a node in the mouse position
    const [nodePosition, setNodePosition] = useState({
      x : 0,
      y : 0
    })
    const handleNewNodeClickPosition = (e : any) => {
      const position = {
        x : e.clientX,
        y : e.clientY
      };
      setNodePosition(position)
    }

    // adding new node handler
    const handleNewNodeClick = async () => {
      var nodeName = randomBytes(3).toString('hex') + '~';
      const newNode = await createNode(projectName, nodeName, nodePosition.x - 255, nodePosition.y);
      if (newNode) {
        const newNodeHandler = {
          id : newNode.id,
          type : newNode.type,
          position : {
            x : newNode.xPos,
            y : newNode.yPos
          },
          data : {
            id : newNode.id
          }
        };
        setNodes(prevNodes=>[...prevNodes, newNodeHandler])
      }
    }

    const [showWorkspaceInfo, setShowWorkspaceInfo] = useState(false);
    const handleShowWorkspaceClick = () => {
        console.log('cl;icked')
        if (showWorkspaceInfo) setShowWorkspaceInfo(false);
        else setShowWorkspaceInfo(true)
    }

    const handleAddUser = (userId : string, name : string) => {
      const ids=[];
      for (let i =0; i < addedUsers.length; i++) {
        ids.push(addedUsers[i].id);
      }
      if (ids.includes(userId)) return;
      
      const userObj = {
        id : userId,
        name : name
      }
      setAddedUsers(prevUsers => [...prevUsers, userObj])
    }
    const handleRemoveUser = (userId : string) => {
      setAddedUsers(prevUsers => prevUsers.filter(userId => userId !== userId))
    }

    if (nodesLoading) return <LoadingSpinner/>
    return (
      <div className="flex">
          {showWorkspaceInfo ? (
              <section className="flex bg-secondary flex-col m-5 w-fit rounded-xl z-50 h-fit absolute px-10 py-5 border border-accent text-sm gap-3">
                  <h1 className="font-bold text-base text-blue-500 border-b-2 border-accent pb-3 flex gap-2">
                    <ListX size={20} onClick={handleShowWorkspaceClick} className=" text-white hover:text-blue-500" />
                      {projectName}
                  </h1>
                  <section>
                      <Dialog onOpenChange={() => setAddedUsers([])}>
            <DialogTrigger className="flex items-center gap-2 hover:bg-accent p-2 rounded-xl hover:cursor-pointer">
                  <UserRoundPlus size={20} />
                              Add member
            </DialogTrigger>
            <DialogContent>
            <DialogHeader className="border-b pb-5">
                <DialogTitle>Add new member</DialogTitle>
                <DialogDescription>
                    Lorem ipsum dolor sit amet, consectetur 
                </DialogDescription>
            </DialogHeader>
            <Command>
  <CommandInput placeholder="Search for a user..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Users">
            {users.map((user) => (
              <CommandItem key={user.name} value={user.name} onSelect={() => handleAddUser(user.id, user.name)}> {user.name} </CommandItem>
            ))}
    </CommandGroup>
  </CommandList>
</Command>
        {addedUsers.length > 0 && (
          <>
                {addedUsers.map((user) => (
                  <div key={user} className="flex justify-between items-center hover:bg-accent px-4 py-1 rounded-xl">
                    {user.name}
                    <UserRoundMinus size={40} onClick={() => handleRemoveUser(user)} className="hover:bg-primary-foreground hover:bg-opacity-70 text-red-500 p-2 rounded-xl hover:cursor-pointer"/>
                  </div>
                ))}
                <form className="w-full" action={async() => {
                  await addUsers(projectName, addedUsers, members).then((res : any) => setMembers(res))
                }}>


                  <button type="submit" className=" w-full bg-blue-700 text-sm py-2 text-white font-bold rounded-xl hover:opacity-70">
                    Add users
                </button>
                </form>
          </>
            )}
            </DialogContent>

        </Dialog>
        <Link href={`${pathname}/c/${projectId}`} className="flex items-center gap-2 hover:bg-accent p-2 rounded-xl hover:cursor-pointer">
          <MessageCircleMore size={20} />
          Open chats
        </Link>
                  </section>
                  <section className="flex flex-col gap-2">
                      <p className="font-semibold ">
                          Members
                      </p>
                      <ul className="opacity-70 flex flex-col gap-2">
                        {members.map((member) => (
                          <form key={member.name} className="flex justify-between items-center hover:bg-accent p-1 rounded-xl"  action={async() => {
                            await removeUser(member.id, members, projectName).then((res : any) => setMembers(res))
                          }}>
                            {member.name}
                                <button type="submit">
                                <UserRoundMinus type="submit" size={30} className="hover:bg-primary-foreground hover:bg-opacity-70 text-red-500 p-1 rounded-xl hover:cursor-pointer"/>
                              </button>
                            </form>
                        ))}
                      </ul>
                  </section>
              </section>
          ) : (
              <ListVideo size={45} onClick={handleShowWorkspaceClick} className="bg-secondary p-3 rounded-xl m-5 absolute h-fit z-50 hover:text-blue-500" />
          )}
                
      <ContextMenu>
          <ContextMenuTrigger onMouseUp={handleNewNodeClickPosition}>
              <div className="w-screen h-screen"  >
                <ReactFlow
                  nodes={nodes}
                  className='bg-background'
                  edges={edges}
                  onNodesChange={onNodesChange}
                  nodeTypes={nodeTypes}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                >
                  <Controls />
                  <Background variant={BackgroundVariant.Lines} lineWidth={0.1} gap={100} color={colorValue} />
                </ReactFlow>
              </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => handleNewNodeClick()}>Add node</ContextMenuItem>
            <ContextMenuItem onClick={() => console.log(nodes)}>Log nodes</ContextMenuItem>
          </ContextMenuContent>
      </ContextMenu>
      </div>

  )
};

