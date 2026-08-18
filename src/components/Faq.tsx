"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export default function Faq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      {items.map((f) => (
        <Accordion.Item key={f.q} value={f.q} className="border-b hairline">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[1.05rem] font-semibold text-primary-ink transition-colors duration-300 hover:text-bordeaux">
              {f.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border hairline text-gold transition-all duration-300 group-hover:border-gold group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gold group-data-[state=open]:text-paper">
                <Plus className="size-4" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-content overflow-hidden">
            <p className="max-w-xl pb-5 text-[0.95rem] text-secondary-ink">
              {f.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
