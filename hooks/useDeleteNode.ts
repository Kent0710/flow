import { create } from "zustand";

type State = {
    nodeId : string;
    toDeleteNode : boolean;
};

type Action = {
    setNodeId : (nodeId : State["nodeId"]) => void;
    setToDeleteNode : (toDeleteNode : State["toDeleteNode"]) => void;
};

export const useDeleteNode = create<State & Action>((set) => ({
    nodeId : '',
    setNodeId : (newValue)=>set(() => ({ nodeId : newValue })),
    toDeleteNode : false,
    setToDeleteNode : (newValue) => set(() => ({ toDeleteNode : newValue })),
}))