import { Handle, type Node, Position, type NodeProps } from '@xyflow/react'

interface DefaultNodeProps
  extends NodeProps<
    Node<{
      label: string
    }>
  > {}

export default function DefaultNode({ data, isConnectable }: DefaultNodeProps) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>

      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
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
    </>
  )
}
