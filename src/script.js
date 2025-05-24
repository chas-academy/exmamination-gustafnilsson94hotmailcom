//Skapar arrayer för inkomster och utgifter
const incomes = [];
const expenses = [];

//Hämtar HTML-element
const descriptionInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const balanceDisplay = document.getElementById("balance");

//Hämtar knappar för inkomst och utgift
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

incomeBtn.addEventListener("click", () => addTransaction("income"));

expenseBtn.addEventListener("click", () => addTransaction("expense"));

function addTransaction(type) {
  // Hämtar värden från input-fälten
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Kontrollerar att beskrivning och belopp är giltiga
  if (!description || isNaN(amount)) return;

  const transaction = { description, amount, type };

  if (type === "income") {
    incomes.push(transaction);
    addToList(incomeList, transaction);
  } else {
    expenses.push(transaction);
    addToList(expenseList, transaction);
  }

  updateBalance();
  clearInputs();
}

function addToList(list, transaction) {
  const li = document.createElement("li");
  li.textContent = `${transaction.description} - ${transaction.amount} kr (${transaction.type === "income" ? "Inkomst" : "Utgift"})`;
  list.appendChild(li);
}

function updateBalance() {
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  balanceDisplay.textContent = (totalIncome - totalExpense).toString();
}

// Rensar input-fälten
function clearInputs() {
  descriptionInput.value = "";
  amountInput.value = "";
}