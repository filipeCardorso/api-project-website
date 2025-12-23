"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { pricingFaqs } from "@/data/faqs"

export function PricingFAQ() {
  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold">Perguntas frequentes</h2>
        <p className="mt-2 text-muted-foreground">
          Duvidas sobre nossos planos e precos
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {pricingFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
