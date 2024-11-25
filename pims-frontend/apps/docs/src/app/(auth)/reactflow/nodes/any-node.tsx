import { Node, NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { type TurboNodeData } from './node-type';

export const AnyNode = memo(function WrappedAnyNode({
  data,
}: NodeProps<Node<TurboNodeData>>) {
  return (
    <div className="text-black bg-white">
      <div className="wrapper gradient overflow-hidden flex relative rounded-[var(--node-border-radius)] grow p-0.5">
        <div className="inner">
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.desc && <div className="subline">{data.desc}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// AnyNode.displayName = 'AnyNode';
