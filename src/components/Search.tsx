import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useState } from "react";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function Search() {
  const [newCommentText, setNewCommentText] = useState("");

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  function handleNewCommentChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewCommentText(event.target.value);
  }


  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <form
      onSubmit={handleSubmit(handleSearchTransactions)}
      className="max-w-[1120px] flex flex-row  p-9 gap-4  m-auto"
    >
      <Input
        type="text"
        placeholder="Busque uma transição...."
        {...register("query")}
        onChange={handleNewCommentChange}
      />
      <Button
        type="submit"
        disabled={isNewCommentEmpty}
        className="bg-primary  disabled:cursor-not-allowed disabled:opacity-5;
"
      >
        Buscar
      </Button>
    </form>
  );
}
