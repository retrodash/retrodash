import { BoardColumn } from "@/components/board/Column";
import type { Column, Card } from "@/types";

interface BoardProps {
  columns: Column[];
  cards: Card[];
  roomId: string;
  userId: string;
  userName: string;
  isAnonymous: boolean;
  isFacilitator: boolean;
}

export function Board({
  columns,
  cards,
  roomId,
  userId,
  userName,
  isAnonymous,
  isFacilitator,
}: BoardProps) {
  return (
    <div className="flex gap-4 p-6 overflow-x-auto h-full items-start">
      {columns.map((col) => (
        <BoardColumn
          key={col.id}
          column={col}
          cards={cards.filter((c) => c.columnId === col.id)}
          roomId={roomId}
          userId={userId}
          userName={userName}
          isAnonymous={isAnonymous}
          isFacilitator={isFacilitator}
        />
      ))}
    </div>
  );
}
