// file: components/idea-town/types.ts

export type Idea = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  upvotes: number;
  createdAt: string;
  // who submitted / owns the idea
  author: {
    baseName?: string; // e.g. "bhavya.base"
    address: `0x${string}`; // optional fallback
  };
  // optional structured breakdown we can show in dialog
  breakdown?: {
    why?: string;
    mvp?: string[];
    tech?: string[];
    risks?: string[];
    links?: { label: string; url: string }[];
  };
};

export type Stream = {
  id: string;
  title: string;
  description: string;
  url: string; // X/Twitter thread or list URL
  tags: string[];
  createdAt: string;
};
