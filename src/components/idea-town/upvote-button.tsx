"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigUp } from "lucide-react";

const KEY = "base-idea-town:votes";

function safeLocalStorage<T>(fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function setSafeLocalStorage(value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
}

export function UpvoteButton({
  ideaId,
  count,
  onUpvote,
}: {
  ideaId: string;
  count: number;
  onUpvote: (id: string) => void;
}) {
  const [voted, setVoted] = React.useState<boolean>(false);

  React.useEffect(() => {
    const votes = safeLocalStorage<Record<string, true>>({});
    setVoted(Boolean(votes[ideaId]));
  }, [ideaId]);

  const handleClick = () => {
    const votes = safeLocalStorage<Record<string, true>>({});
    if (votes[ideaId]) return; // already voted
    votes[ideaId] = true;
    setSafeLocalStorage(votes);
    setVoted(true);
    onUpvote(ideaId);
  };

  return (
    <Button
      size="sm"
      variant={voted ? "secondary" : "default"}
      onClick={handleClick}
      disabled={voted}
      className="gap-2"
    >
      <ArrowBigUp className="h-4 w-4" />
      <span className="tabular-nums">{count}</span>
    </Button>
  );
}
