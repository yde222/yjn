'use client';

import { Button } from '@pims-frontend/ui/components/ui/button';
import {
  Background,
  Controls,
  type Edge,
  MarkerType,
  type Node,
  type NodeMouseHandler,
  type OnConnect,
  ReactFlow,
  type ReactFlowProps,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import React, { useCallback, useRef } from 'react';
import { Detailbar } from './detailbar';
import { FlowSidebar } from './flow-sidebar';
import { AnyNode } from './nodes/any-node';
import { DefaultNode } from './nodes/default-node';
import { InputNode } from './nodes/input-node';
import { type TurboNodeData } from './nodes/node-type';
import { OutputNode } from './nodes/output-node';

import '@xyflow/react/dist/style.css';
import { FloatingEdge } from './edges/floating-edge';

const initialNodes: Node<TurboNodeData>[] = [
  // {
  //     id: "r-1",
  //     position: { x: 50, y: 50 },
  //     type: "input",
  //     data: { icon: <FunctionIcon />, title: "readFile", desc: "api.ts" },
  // },
  // {
  //     id: "r-2",
  //     position: { x: 250, y: 50 },
  //     type: "default",
  //     data: { title: "bundle", desc: "apiContents" },
  // },
];

const initialEdges: Edge[] = [
  {
    id: 'B->G',
    source: 'r-1',
    target: 'r-2',
  },
];

const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
  any: AnyNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  // turbo: TurboEdge,
  // step: StepEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2 },
  // type: "smoothstep",
  // type: '',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    // color: "#FF0072",
  },
};
export type SelectedDataType =
  | (Node<TurboNodeData> & {
      clicked: 'node';
      click_name: string;
      click_desc: string;
    })
  | (Edge & {
      clicked: 'edges';
      click_name: string;
      click_desc: string;
    })
  | null;

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedData, setSelectedData] =
    React.useState<SelectedDataType>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [],
  );

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      //const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const nodeId = event.dataTransfer.getData('application/nodeId');
      const nodeName = event.dataTransfer.getData('application/nodeName');
      const nodeDesc = event.dataTransfer.getData('application/nodeDesc');
      const nodeColor = event.dataTransfer.getData('application/nodeColor');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log('event', event);
      const newNode = {
        id: nodeId,
        type,
        position,
        data: { title: nodeName, desc: nodeDesc },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const onPaneClick = () => {
    setSelectedData(null);
  };

  const onNodeClick: NodeMouseHandler<Node<TurboNodeData>> = (_, r) => {
    console.log('e', r);
    setSelectedData({
      clicked: 'node',
      click_name: '상태',
      click_desc: '상태는 작업 과정의 단계를 캡처합니다.',
      ...r,
    });
  };

  const onEdgeClick: ReactFlowProps<
    Node<TurboNodeData>,
    Edge
  >['onEdgeClick'] = (_, r) => {
    console.log('data', r);
    setSelectedData({
      clicked: 'edges',
      click_name: '전환',
      click_desc:
        '전환은 흐름을 통해 업무를 이동하는 작업으로 상태를 연결합니다.',
      ...r,
    });
  };

  return (
    <>
      <Button onClick={() => console.log({ nodes: nodes, edge: edges })}>
        데이터 확인
      </Button>
      <div className="flex-row flex  h-full">
        <FlowSidebar />
        <div
          className="reactflow-wrapper flex-grow h-full"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            // snapToGrid={true}
            // snapGrid={[25, 25]}
            zoomOnScroll={false}
            deleteKeyCode={['Delete', 'BackSpace']}
            onPaneClick={onPaneClick}
            // onNodeContextMenu={onNodeContextMenu}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
          >
            <Controls />
            <Background />
          </ReactFlow>
          {/* {menu && <ContextMenu onClick={onPaneClick} {...menu} />} */}
        </div>

        <Detailbar detail={selectedData} />
      </div>
    </>
  );
};

export default function Page() {
  return (
    <ReactFlowProvider>
      <div className="w-full h-[800px] p-5">
        <DnDFlow />
      </div>
    </ReactFlowProvider>
  );
}
