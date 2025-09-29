"use client";
import React from "react";
import type { Idea } from "./types";
import { IdeaCard } from "./idea-card";
import { IdeaDialog } from "./idea-dialog";

export function IdeaList({ ideas }: { ideas: Idea[] }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Idea | null>(null);

  const handleOpen = (idea: Idea) => {
    setActive(idea);
    setOpen(true);
  };

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} onClick={handleOpen} />
        ))}
      </div>

      <IdeaDialog open={open} onOpenChange={setOpen} idea={active} />
    </>
  );
}
