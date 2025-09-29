"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Idea } from "./types";
import { IdentityBadge } from "../identity-badge";

export function IdeaCard({
  idea,
  onClick,
}: {
  idea: Idea;
  onClick: (idea: Idea) => void;
}) {
  return (
    <button
      onClick={() => onClick(idea)}
      className="text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="h-full">
        <CardHeader className="pb-0">
          <CardTitle className="flex gap-1 flex-col items-start text-xs leading-snug w-full">
            <IdentityBadge
              address={"0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF"}
            />
            {idea.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {idea.description}
        </CardContent>
      </Card>
    </button>
  );
}
