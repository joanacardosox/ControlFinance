import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "@/utils/formatter";
import { useContext } from "use-context-selector";
import { Button } from "./ui/button";

export function TransactionTable() {
  const { transactions, fetchTransactions, clearTransactions } =
    useContext(TransactionsContext);

  return (
    <Table className="max-w-[1120px] p-9   gap-4  m-auto">
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {transaction.description}
            </TableCell>

            <TableCell>
              {transaction.type === "outcome" && "- "}
              {priceFormatter.format(transaction.price)}
            </TableCell>

            <TableCell className="text-right">{transaction.category}</TableCell>
            <TableCell>
              {transaction.createdAt
                ? dataFormatter.format(new Date(transaction.createdAt))
                : "Invalid Date"}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}

        <Button
          onClick={clearTransactions}
          className="text-blue-700 text-sm  w-full bg-transparent border-0"
        >
          Limpar Tabela
        </Button>
      </TableBody>
    </Table>
  );
}
