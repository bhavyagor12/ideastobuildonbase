"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Idea } from "./types";
import { IdentityBadge } from "../identity-badge";

export function IdeaDialog({
  open,
  onOpenChange,
  idea,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  idea: Idea | null;
}) {
  if (!idea) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="leading-tight">{idea.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <IdentityBadge
              address={"0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF"}
            />
            <span className="text-xs text-muted-foreground">11.04.2024</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">{idea.description}</p>

          {idea.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}

          {idea.breakdown?.why && (
            <section>
              <h4 className="font-semibold mb-2">Why this matters</h4>
              <p className="text-sm text-muted-foreground">
                {idea.breakdown.why}
              </p>
            </section>
          )}

          {idea.breakdown?.mvp?.length ? (
            <section>
              <h4 className="font-semibold mb-2">MVP</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {idea.breakdown.mvp.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {idea.breakdown?.tech?.length ? (
            <section>
              <h4 className="font-semibold mb-2">Tech notes</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {idea.breakdown.tech.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {idea.breakdown?.links?.length ? (
            <section>
              <h4 className="font-semibold mb-2">Links</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {idea.breakdown.links.map(({ label, url }) => (
                  <li key={url}>
                    <a
                      className="underline underline-offset-2"
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
