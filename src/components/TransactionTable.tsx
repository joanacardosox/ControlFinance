import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "@/utils/formatter";
import { useContext } from "use-context-selector";
import { Button } from "./ui/button";
import { Trash } from "phosphor-react";

export function TransactionTable() {
  const { transactions, clearTransactions } = useContext(TransactionsContext);

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
          </TableRow>
        ))}
        <Button
          onClick={clearTransactions}
          className="max-w-md m-auto text-blue-700 text-sm flex justify-items-center bg-transparent border-0 mb-4"
        >
          <Trash />
        </Button>
      </TableBody>
    </Table>
  );
}
