"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Idea } from "./types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";

const TAGS = [
  "payments",
  "defi",
  "games",
  "daos",
  "social",
  "infra",
  "ai",
  "creator",
] as const;

const schema = z.object({
  title: z.string().min(3, "At least 3 chars").max(100),
  description: z.string().min(10, "At least 10 chars").max(1000),
  tags: z.array(z.enum(TAGS)).min(1, "Pick at least one category"),
  why: z.string().optional(),
  mvp: z.string().optional(),
  tech: z.string().optional(),
  links: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function IdeaForm({ onCreate }: { onCreate: (idea: Idea) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      why: "",
      mvp: "",
      tech: "",
      links: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: FormValues) => {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      description: values.description.trim(),
      tags: values.tags,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      author: {
        address: "0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF",
      },
      breakdown: {
        why: values.why?.trim() || undefined,
        mvp: values.mvp
          ? values.mvp
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        tech: values.tech
          ? values.tech
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        links: values.links
          ? values.links
              .split(",")
              .map((pair) => {
                const [label, url] = pair.split("|").map((s) => s.trim());
                return url ? { label: label || url, url } : null;
              })
              .filter((x): x is { label: string; url: string } => !!x)
          : [],
      },
    };

    onCreate(newIdea);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Curate onchain bounties feed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What’s the idea? Why Base? What would MVP look like?"
                  className="min-h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags multi-select */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {field.value.length > 0
                        ? field.value.join(", ")
                        : "Select categories"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        {TAGS.map((tag) => {
                          const selected = field.value.includes(tag);
                          return (
                            <CommandItem
                              key={tag}
                              value={tag}
                              onSelect={() => {
                                if (selected) {
                                  field.onChange(
                                    field.value.filter((t) => t !== tag),
                                  );
                                } else {
                                  field.onChange([...field.value, tag]);
                                }
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selected ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {tag}
                            </CommandItem>
                          );
                        })}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Breakdowns */}
        <FormField
          control={form.control}
          name="why"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why this matters</FormLabel>
              <FormControl>
                <Textarea placeholder="Why should this be built?" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mvp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MVP steps</FormLabel>
              <FormControl>
                <Textarea placeholder="One step per line" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tech"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List technologies, integrations, infra"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="links"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links</FormLabel>
              <FormControl>
                <Input
                  placeholder="Format: label|url, label2|url2"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!form.formState.isValid && !form.formState.isSubmitted}
          >
            Submit idea
          </Button>
        </div>
      </form>
    </Form>
  );
}
