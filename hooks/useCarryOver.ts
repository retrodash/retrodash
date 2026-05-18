"use client";

import { useState, useEffect } from "react";
import { getUncompletedActionItems } from "@/lib/firestore";
import type { Card, Room } from "@/types";

export interface CarryOverState {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
  candidateItems: Card[];
  loadingItems: boolean;
  checkedIds: Set<string>;
  toggleItem: (id: string) => void;
  toggleAll: () => void;
  selectedTexts: string[];
}

export function useCarryOver(endedRooms: Room[]): CarryOverState {
  const [enabled, setEnabledRaw] = useState(false);
  const [selectedRoomId, setSelectedRoomIdRaw] = useState<string | null>(null);
  const [candidateItems, setCandidateItems] = useState<Card[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!selectedRoomId) {
      setCandidateItems([]);
      setCheckedIds(new Set());
      return;
    }

    let cancelled = false;
    setLoadingItems(true);
    setCandidateItems([]);
    setCheckedIds(new Set());

    getUncompletedActionItems(selectedRoomId).then((items) => {
      if (cancelled) return;
      setCandidateItems(items);
      setCheckedIds(new Set(items.map((i) => i.id)));
      setLoadingItems(false);
    });

    return () => { cancelled = true; };
  }, [selectedRoomId]);

  const setEnabled = (v: boolean) => {
    setEnabledRaw(v);
    if (!v) {
      setSelectedRoomIdRaw(null);
      setCandidateItems([]);
      setCheckedIds(new Set());
    }
  };

  const setSelectedRoomId = (id: string | null) => {
    setSelectedRoomIdRaw(id);
  };

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (checkedIds.size === candidateItems.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(candidateItems.map((i) => i.id)));
    }
  };

  const selectedTexts = candidateItems
    .filter((item) => checkedIds.has(item.id))
    .map((item) => item.text);

  return {
    enabled,
    setEnabled,
    selectedRoomId,
    setSelectedRoomId,
    candidateItems,
    loadingItems,
    checkedIds,
    toggleItem,
    toggleAll,
    selectedTexts,
  };
}
