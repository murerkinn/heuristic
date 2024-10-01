import { Handle, type Node, Position, type NodeProps } from '@xyflow/react'

interface ControlNodeProps
  extends NodeProps<
    Node<{
      label: string
    }>
  > {}

export default function ControlNode({ data, isConnectable }: ControlNodeProps) {
  return (
    <div className="react-flow__node-default">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  )
}
