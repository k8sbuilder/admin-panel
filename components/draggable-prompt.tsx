import { useDraggable } from '@dnd-kit/core';

interface DraggablePromptProps {
  id: string;
  prompt: string;
}

export function DraggablePrompt({ id, prompt }: DraggablePromptProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="p-2 bg-gray-100 rounded-md text-sm cursor-move mb-2"
    >
      {prompt}
    </div>
  );
}

