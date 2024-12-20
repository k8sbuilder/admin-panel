import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableAreaProps {
  id: string;
  children: ReactNode;
}

export function DroppableArea({ id, children }: DroppableAreaProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className="mb-4 min-h-[80px] border-2 border-dashed rounded-md flex items-center justify-center p-2"
    >
      {children}
    </div>
  );
}

