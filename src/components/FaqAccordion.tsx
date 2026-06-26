import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/faqs";

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border border-border bg-card/60 rounded-xl mb-2 px-5 data-[state=open]:border-primary/40"
        >
          <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline py-5">
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              {item.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
