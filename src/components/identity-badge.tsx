"use client";

import { Avatar, Name } from "@coinbase/onchainkit/identity";
export function IdentityBadge({ address }: { address: `0x${string}` }) {
  console.log("Rendering IdentityBadge for address:", address);
  return (
    <div className="flex items-center gap-2">
      <Avatar
        address="0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF"
        className="text-xs h-6 w-6"
      />
      <Name
        address={"0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF"}
        className="bg-cerulean px-2 py-1 rounded text-xs"
      />
    </div>
  );
}
