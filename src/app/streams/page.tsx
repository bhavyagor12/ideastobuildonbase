"use client";
import React from "react";
import { XEmbed } from "react-social-media-embed";

export const userStreams = [
  {
    id: "0",
    url: "https://x.com/BasedIndia/status/1949827929002905892",
    title: "Ideas from crypto accerlators",
    description:
      "How to break down ideas from crypto accelerators like AllianceDAO.",
  },
  {
    id: "1",
    url: "https://x.com/bhavya_gor/status/1952364207502217576",
    title: "DCA: Mini App Breakdown",
    description:
      "Learn how Dollar Cost Averaging was built as a mini app and how to extend it.",
  },
  {
    id: "2",
    url: "https://x.com/bhavya_gor/status/1959973054379139136",
    title: "Build trending mini apps",
    description: "A structured breakdown of how to make trending mini apps.",
  },
  {
    id: "3",
    url: "https://x.com/bhavya_gor/status/1965058899171754483",
    title: "Build large scale business ideas",
    description:
      "How to break down large scale business ideas into actionable steps.",
  },
  {
    id: "4",
    url: "https://x.com/bhavya_gor/status/1967583132045210056",
    title: "Build on Defi Social",
    description:
      "How to build mini apps on Defi Social and leverage its social graph.",
  },
  {
    id: "5",
    url: "https://x.com/bhavya_gor/status/1970119256659624322",
    title: "Build mini apps for Creators",
    description: "New ways to build mini apps that help creators engage.",
  },
];

export default function StreamsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Idea Streams</h1>
        <p className="text-muted-foreground mt-1">
          Check how ideas are broken down and how they come to life.
        </p>
      </section>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {userStreams.map((s) => (
          <div
            key={s.id}
            className="rounded-lg border bg-card p-4 shadow-sm space-y-3"
          >
            <div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
            <XEmbed url={s.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
