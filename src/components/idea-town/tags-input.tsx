"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [text, setText] = React.useState("");

  const commit = (t: string) => {
    const tag = t.trim().replace(/\s+/g, "-");
    if (!tag) return;
    const next = Array.from(new Set([...(value || []), tag])).slice(0, 6);
    onChange(next);
    setText("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {(value || []).map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            <span>{t}</span>
            <button
              type="button"
              className="ml-1 inline-flex"
              onClick={() => onChange(value.filter((x) => x !== t))}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder="Type a tag and press Enter"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit(text);
          }
        }}
        onBlur={() => commit(text)}
      />
    </div>
  );
}
