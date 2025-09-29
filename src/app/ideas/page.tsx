"use client";
import React from "react";
import type { Idea } from "@/components/idea-town/types";
import { ideas as CONSTANT_IDEAS } from "../../constants";
import { IdeaList } from "@/components/idea-town/idea-list";
import { FiltersBar } from "@/components/filters-bar";

export default function Ideas() {
  const [ideas, setIdeas] = React.useState<Idea[]>(CONSTANT_IDEAS);

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    ideas.forEach((i) => i.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [ideas]);

  const [selected, setSelected] = React.useState<string>("");
  const [q, setQ] = React.useState("");

  const clearFilters = () => {
    setSelected("");
    setQ("");
  };

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    return ideas.filter((i) => {
      const matchesSearch =
        !term ||
        i.title.toLowerCase().includes(term) ||
        i.description.toLowerCase().includes(term);

      const matchesTag = !selected || i.tags?.includes(selected);

      return matchesSearch && matchesTag;
    });
  }, [ideas, q, selected]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured ideas</h2>
        </div>
        <FiltersBar
          allTags={allTags}
          selected={selected}
          onSelect={setSelected}
          q={q}
          onSearch={setQ}
          onClear={clearFilters}
          total={ideas.length}
          shown={filtered.length}
        />

        <IdeaList ideas={filtered} />
      </section>
    </div>
  );
}
