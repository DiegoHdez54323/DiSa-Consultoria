import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`item-${index}`}
          className="border border-border/50 rounded-xl px-6 bg-card/50 data-[state=open]:border-primary/30"
        >
          <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary shrink-0" />
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4 pl-8">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
