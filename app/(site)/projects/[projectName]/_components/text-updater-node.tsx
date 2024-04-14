import { twMerge } from 'tailwind-merge';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
    Handle,
    Position,
  } from 'reactflow';

import Link from 'next/link';

import { useDeleteNode } from '@/hooks/useDeleteNode';
import { PanelLeftOpen } from 'lucide-react';

import {getNodeDataUsingNodeId} from '@/actions/getNodeData';
import updateNodeName from '@/actions/updateNodeName';
import {updatePinnedNodes} from '@/actions/updatePinNodes';


const TextUpdaterNode = ({data} : any) => {
  const [nodeName, setNodeName] = useState('');

  const decodedPathname = decodeURI(usePathname())
  const projectName = decodedPathname.split("/")[2];
  useEffect(() => {
    async function getNodeDataHandler() {
      const node = await getNodeDataUsingNodeId(data.id);
      if (node) {
        if (node.name[6] === '~') {
          setNodeName('')
          return;
        }
        setNodeName(node.name)
      } 
    }
    getNodeDataHandler();
  }, [data.id])

  const onChange = (e : any) => {
    setNodeName(e.target.value);
  }

  const path = usePathname();

  const [enableBorder, setEnableBorder] = useState(false);
  const handleInputOnFocus = () => {
    setEnableBorder(true)
  } 
  const handleInputOnBlur = () => {
    setEnableBorder(false)
    updateNodeName(data.id, nodeName)
  } 

  const {setNodeId, setToDeleteNode} = useDeleteNode();
  const handleDeleteNodeClick = () => {
    setNodeId(data.id);
    setToDeleteNode(true);
  }

  // check if the project and node name are the same
  const nameChecker = () => {
    return projectName === nodeName ? true : false;
  }
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={twMerge(`bg-secondary text-primary p-8 px-10 font-bold text-sm rounded-xl ${nameChecker() && 'bg-blue-700'}`, enableBorder && "shadow-2xl bg-opacity-70 border-2 border-blue-500")}>
            <Handle type="target" position={Position.Bottom} />
            <div className='flex gap-3 items-center '>
              <input disabled={nameChecker() ? true : false} placeholder='Enter node name...' onChange={onChange} value={nodeName} id="inputField" name="inputField" autoComplete="off" onFocus={handleInputOnFocus} onBlur={handleInputOnBlur}
                className={twMerge(` focus:outline-none text-xl nodrag rounded-sm bg-secondary ${nameChecker() && "bg-blue-700 text-white"}`, enableBorder && "bg-opacity-70")} />
              <Link href={`${path}/${nodeName}`}>
                <PanelLeftOpen size={40} className={`hover:bg-primary-foreground hover:bg-opacity-70 p-2 rounded-xl text-blue-500 ${projectName === nodeName && "text-white hover:bg-blue-100"}`} />
              </Link>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
          </div>
      </ContextMenuTrigger>
      {!nameChecker() && (
        <ContextMenuContent>
          <ContextMenuItem disabled={nodeName === '' ? true : false} onClick={() => {
            updatePinnedNodes(nodeName)
          }}>Pin </ContextMenuItem>
          <ContextMenuItem onClick={handleDeleteNodeClick}>Delete</ContextMenuItem>
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
};

export default TextUpdaterNode;