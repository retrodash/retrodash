"use client";

import { Toggle } from "@/components/ui/Toggle";
import { Skeleton } from "@/components/ui/Skeleton";
import type { CarryOverState } from "@/hooks/useCarryOver";
import type { Room } from "@/types";

interface CarryOverSectionProps {
  carryOver: CarryOverState;
  endedRooms: Room[];
  roomsLoading: boolean;
}

export function CarryOverSection({
  carryOver,
  endedRooms,
  roomsLoading,
}: CarryOverSectionProps) {
  const {
    enabled, setEnabled,
    selectedRoomId, setSelectedRoomId,
    candidateItems, loadingItems,
    checkedIds, toggleItem, toggleAll,
    selectedTexts,
  } = carryOver;

  const allChecked = candidateItems.length > 0 && checkedIds.size === candidateItems.length;

  return (
    <div className="space-y-4">
      {/* Toggle row — matches "Anonymous mode" row style */}
      <div className="flex items-center justify-between gap-4 py-1">
        <div>
          <p className="text-text-primary text-sm font-medium">
            Carry over action items
          </p>
          <p className="text-text-muted text-xs mt-0.5">
            Import uncompleted items from a past retro
          </p>
        </div>
        <Toggle
          checked={enabled}
          onChange={setEnabled}
          aria-label="Carry over action items"
        />
      </div>

      {/* Expanded content */}
      {enabled && (
        <div className="space-y-3 pl-0">
          {/* Room selector */}
          {roomsLoading ? (
            <Skeleton className="h-11 w-full" />
          ) : endedRooms.length === 0 ? (
            <p className="text-text-muted text-sm">
              No ended rooms yet. Rooms appear here after a retro ends.
            </p>
          ) : (
            <select
              value={selectedRoomId ?? ""}
              onChange={(e) =>
                setSelectedRoomId(e.target.value || null)
              }
              className="w-full h-11 px-3 rounded-md bg-bg-elevated border border-border text-sm text-text-primary outline-none focus:border-accent-cyan transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Pick a past room…
              </option>
              {endedRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          )}

          {/* Items list */}
          {selectedRoomId && (
            loadingItems ? (
              <div className="space-y-2">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            ) : candidateItems.length === 0 ? (
              <p className="text-text-muted text-sm">
                No uncompleted action items in this room.
              </p>
            ) : (
              <div className="space-y-2">
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="text-accent-cyan text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {allChecked ? "Deselect all" : "Select all"}
                  </button>
                  <span className="text-xs text-text-muted">
                    {selectedTexts.length} of {candidateItems.length} selected
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-1">
                  {candidateItems.map((item) => {
                    const checked = checkedIds.has(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-bg-elevated transition-colors text-left cursor-pointer"
                      >
                        <span
                          className={`mt-0.5 shrink-0 size-4 rounded-sm border flex items-center justify-center transition-colors ${
                            checked
                              ? "bg-accent-cyan border-accent-cyan"
                              : "border-border bg-bg-elevated"
                          }`}
                          aria-hidden
                        >
                          {checked && <CheckIcon />}
                        </span>
                        <span className="text-sm text-text-primary leading-snug">
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1.5 5l2.5 2.5L8.5 2"
        stroke="var(--color-bg-base)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
