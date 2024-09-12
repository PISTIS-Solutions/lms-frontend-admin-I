// "use client";
// import { User, users } from "@/data/users";
// import {
//   DndContext,
//   DragEndEvent,
//   KeyboardSensor,
//   PointerSensor,
//   TouchSensor,
//   closestCenter,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   arrayMove,
//   rectSortingStrategy,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import React, { ReactNode, useState } from "react";

// interface DragAndDropContextProps {
//   onDragEnd(event: DragEndEvent): void;
//   children: ReactNode;
//   data: Array<object>;
// }

// export default function DragAndDropContext({
//   children,
//   onDragEnd,
//   data,
// }: DragAndDropContextProps) {
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(TouchSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">User List</h2>
//       <ul className="bg-white shadow-md rounded-lg">
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={onDragEnd}
//         >
//           <SortableContext items={data} strategy={rectSortingStrategy}>
//             {children}
//           </SortableContext>
//         </DndContext>
//       </ul>
//     </div>
//   );
// }
