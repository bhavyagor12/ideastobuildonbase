"use client";
import React from "react";

function loadTwitterWidgets() {
  return new Promise<void>((resolve) => {
    // @ts-expect-error twttr is injected by the Twitter widgets script
    if (window.twttr && window.twttr.widgets) return resolve();

    const id = "twitter-wjs";
    if (document.getElementById(id)) return resolve();

    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = "https://platform.twitter.com/widgets.js";
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

export function TwitterEmbed({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const container = ref.current; // capture current ref

    loadTwitterWidgets().then(() => {
      if (!mounted || !container) return;
      // @ts-expect-error twttr is injected by the Twitter widgets script
      window.twttr.widgets.createTweet(extractTweetId(url), container, {
        align: "center",
        dnt: true,
      });
    });

    return () => {
      mounted = false;
      if (container) container.innerHTML = "";
    };
  }, [url]);

  return <div ref={ref} className={className} />;
}

function extractTweetId(url: string): string {
  // Handles x.com or twitter.com status URLs
  // e.g. https://x.com/user/status/1970119256659624322
  const m = url.match(/status\/(\d+)/);
  return m?.[1] ?? "";
}
