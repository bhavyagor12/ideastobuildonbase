// file: app/page.tsx
"use client";
import React from "react";
import type { Idea } from "@/components/idea-town/types";
import { ideas as CONSTANT_IDEAS } from "../constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IdeaCard } from "@/components/idea-town/idea-card";

export default function Home() {
  const [ideas] = React.useState<Idea[]>(CONSTANT_IDEAS);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10 space-y-16">
      <section className="relative text-center py-20 rounded-3xl text-white bg-base-blue">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4">
          Every great thing starts with an idea.
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-10/90">
          it’s time to be based!
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Recent ideas</h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee min-w-max">
            {ideas.slice(0, 5).map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onClick={() => {}} />
            ))}

            {ideas.slice(0, 5).map((idea) => (
              <IdeaCard
                key={idea.id + "-duplicate"}
                idea={idea}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Payments",
              desc: "Onchain remittances, micropayments, streaming money.",
            },
            {
              title: "DeFi",
              desc: "Protocols, risk tools, credit circles, DCA apps.",
            },
            {
              title: "Games",
              desc: "Onchain mini-games, provable fairness, collabs.",
            },
            {
              title: "Social / Farcaster",
              desc: "Casts, engagement coaches, collab boards, quizzes.",
            },
            {
              title: "Infra / Tooling",
              desc: "Developer SDKs, MPC demos, infra primitives.",
            },
            {
              title: "DAOs / Communities",
              desc: "Creator DAOs, governance, study sprints, credit groups.",
            },
          ].map((cat) => (
            <Card
              key={cat.title}
              className="shadow-sm bg-cerulean text-gray-100"
            >
              <CardHeader>
                <CardTitle>{cat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">{cat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
