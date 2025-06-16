import { BASE_URL } from "@/lib/url";
import { useEffect, useState } from "react";


export function useAccountData() {
  const [name, setName] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState({ accountNumber: "" });
const [accountNumber, setAccountNumber] = useState("");
const [email, setEmail] = useState("")
const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/accounts/details`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        console.log(data)

        setName(data.first_name + " " + data.last_name);
        setTotalBalance(data.balance);
        setFullName(data.full_name);
        setAccountNumber(data.accountNumber)
        setEmail(data.email)
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          accountNumber: "Error verifying account",
        }));
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/accounts/transactions`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        const data = await res.json();

        console.log("Transactions:", data);
        const splitTransactions = data.transactions.slice(0, 4);
        setRecentTransactions(splitTransactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchAccountDetails();
    fetchTransactions();

  }, []);

  return {
    name,
    fullName,
    totalBalance,
    accountNumber,
    email,
    recentTransactions,
    errors,
  };
}
