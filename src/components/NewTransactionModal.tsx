import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { TransactionsContext } from "@/contexts/TransactionsContext";

import { ArrowCircleUp } from "phosphor-react";

import { AlertCircle } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data;

    await createTransaction({
      description,
      price,
      category,
      type,
    });

    reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary" variant="outline">
          Nova Transação
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateNewTransaction)}
          className="flex flex-col gap-4 py-4 items-center"
        >
          <div className="grid place-items-center gap-4 w-full">
            <Input
              type="text"
              placeholder="Descrição"
              className="col-span-3"
              required
              {...register("description")}
            />
          </div>

          <div className="grid place-items-center gap-4 w-full">
            <Input
              type="text"
              placeholder="Preço"
              className="col-span-3"
              required
              {...register("price", { valueAsNumber: true })}
            />
          </div>

          <div className="grid place-items-center gap-4 w-full">
            <Input
              type="text"
              placeholder="Categoria"
              className="col-span-3"
              required
              {...register("category")}
            />
          </div>

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-row justify-center gap-4"
                >
                  <Button
                    type="submit"
                    className="flex max-w-[300px] gap-3 hover:bg-green-400 p-2 items-center rounded-md "
                  >
                    <RadioGroupItem value="income">
                      <ArrowCircleUp fontSize={16} color="#000" />
                    </RadioGroupItem>
                    <p>Entrada</p>
                  </Button>

                  <Button className="flex max-w-[300px] gap-3 hover:bg-rose-400 p-2 items-center rounded-md ">
                    <RadioGroupItem value="outcome">
                      <ArrowCircleUp fontSize={16} color="#000" />
                    </RadioGroupItem>
                    <p>Saída</p>
                  </Button>
                </RadioGroup>
              );
            }}
          />

          <DialogDescription className="flex flex-row justify-center items-center gap-2">
            <AlertCircle />
            Selecione uma das opções
          </DialogDescription>

          <Button
            className="w-full disabled:cursor-not-allowed disabled:bg-opacity-5 "
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
