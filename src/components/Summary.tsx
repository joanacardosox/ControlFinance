import { Card, CardHeader } from "@/components/ui/card";
import { useSummary } from "@/hooks/useSummary";
import { priceFormatter } from "@/utils/formatter";

import { CurrencyDollar, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";

export function Summary() {
  const summary = useSummary();

  return (
    <div className="overflow-hidden w-full max-w-fit mx-auto px-4 ">
      <div className=" overflow-x-scroll flex gap-4 snap-x flex-row py-8">
        <Card className=" min-w-[250px] md:min-w-[350px] whitespace-nowrap snap-center">
          <CardHeader>
            <span>Saida</span>

            <strong>{priceFormatter.format(summary.income)}</strong>

            <ArrowCircleUp fontSize={32} color="#F75A68" />
          </CardHeader>
        </Card>

        <Card className=" min-w-[250px] md:min-w-[350px] whitespace-nowrap snap-center">
          <CardHeader>
            <span>Entrada</span>

            <strong>{priceFormatter.format(summary.outcome)}</strong>

            <ArrowCircleDown fontSize={32} color="#00875F" />
          </CardHeader>
        </Card>

        <Card className=" min-w-[250px] md:min-w-[350px] whitespace-nowrap snap-center bg-primary">
          <CardHeader>
            <span>Total</span>

            <strong>{priceFormatter.format(summary.total)}</strong>
            <CurrencyDollar fontSize={32} color="#fff" />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
