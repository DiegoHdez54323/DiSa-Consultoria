import { Minus, Plus } from "lucide-react";
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
          className="border rounded-2xl transition-all duration-300 border-border/50 bg-card hover:border-border data-[state=open]:border-primary/50 data-[state=open]:bg-background data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
        >
          <AccordionTrigger className="group w-full flex items-center justify-between p-6 text-left font-semibold text-lg hover:no-underline">
            <span className="text-foreground group-data-[state=open]:text-primary">
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
