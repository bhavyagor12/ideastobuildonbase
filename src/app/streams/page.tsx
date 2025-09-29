"use client";
import React from "react";
import { TwitterEmbed } from "@/components/twitter-embed";
import type { Stream } from "@/components/idea-town/types";

export const userStreams: Stream[] = [
  {
    id: "us1",
    title: "Bhavya — Idea stream",
    description: "A running thread of ideas and breakdowns (includes video).",
    url: "https://x.com/bhavya_gor/status/1970119256659624322",
    tags: ["bhavya", "ideas", "video"],
    createdAt: new Date().toISOString(),
  },
];

export default function StreamsPage() {
  const isTwitter = (u: string) => /(?:x\.com|twitter\.com)\//i.test(u);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Idea Streams</h1>
        <p className="text-muted-foreground mt-1">
          Check how ideas are broken down and how they come to life.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userStreams.map((s) => (
          <div key={s.id} className="space-y-2">
            {isTwitter(s.url) ? (
              <TwitterEmbed
                url={s.url}
                className="rounded-md overflow-hidden"
              />
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
