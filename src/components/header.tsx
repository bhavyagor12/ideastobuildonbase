"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { IdeaForm } from "./idea-town/idea-form";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/base.svg"}
            alt="Base"
            width={48}
            height={48}
            className="rounded"
          />
          <span className="font-semibold">Idea Town</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3">
          <Link
            href="/ideas"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Ideas
          </Link>
          <Link
            href="/streams"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Streams
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Submit idea</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Submit an idea</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground mb-4">
                Title, a clear description, and a few tags (comma-separated) is
                enough.
              </p>
              <IdeaForm onCreate={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>
  );
}
