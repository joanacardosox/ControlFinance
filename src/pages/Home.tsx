import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { Search } from "@/components/Search";
import { Summary } from "@/components/Summary";
import { TransactionTable } from "@/components/TransactionTable";

export function Home() {
  return (
    <>
      <Header />
      <Summary />
      <div className="bg-gray-950 mx-2.5">
        <Search />
        <TransactionTable />
      </div>
      <Footer />
    </>
  );
}
