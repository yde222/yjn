import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { memo } from 'react';
import { TurboNodeData } from './node-type';

export const DefaultNode = memo(({ data }: NodeProps<Node<TurboNodeData>>) => {
  return (
    <>
      <div className="wrapper gradient text-black">
        <div className="inner">
          <div className="body">
            <div>
              <div className="title">{data.title}</div>
              {data.desc && <div className="subline">{data.desc}</div>}
            </div>
          </div>
          <Handle
            type="target"
            className="!w-3 !h-7 !bg-gray-400 !rounded-none !border-white"
            position={Position.Left}
          />
          <Handle
            type="source"
            className="!w-3 !h-7 !bg-gray-400 !rounded-none !border-white"
            position={Position.Right}
          />
        </div>
      </div>
    </>
  );
});

DefaultNode.displayName = 'DefaultNode';
