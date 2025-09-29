"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  allTags: string[];
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  q: string;
  onSearch: (v: string) => void;
  onClear: () => void;
  total: number;
  shown: number;
};

export function FiltersBar({
  allTags,
  selected,
  onSelect,
  q,
  onSearch,
  onClear,
  total,
  shown,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Input
          value={q}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search ideas (title or description)"
          className="max-w-md"
        />

        <Select
          value={selected ?? ""}
          onValueChange={(val) => {
            onSelect(val);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-2">
          {(selected || q) && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{shown}</span> of {total}
          </span>
        </div>
      </div>
    </div>
  );
}
