'use client'

import { DndContext, DndContextProps } from '@dnd-kit/core'

export function DndProvider({ children, ...props }: DndContextProps) {
  return <DndContext {...props}>{children}</DndContext>
}

