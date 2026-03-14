loadData();

function loadData() {

  const data = DB.getData();

  document.getElementById("balance").innerText = data.balance;
  document.getElementById("overExpense").innerText = data.overExpense;

  const list = document.getElementById("transactions");

  list.innerHTML = "";

  data.transactions.reverse().forEach(t => {

    const li = document.createElement("li");

    li.className = "list-group-item";

    li.innerHTML = `
      <b>${t.type}</b> - ${t.category} - ₹${t.amount}
      <br>
      <small>${t.date}</small>
    `;

    list.appendChild(li);
  });
}

function addCredit() {

  const amount = Number(document.getElementById("creditAmount").value);

  const data = DB.getData();

  data.balance += amount;

  data.transactions.push({
    type: "Credit",
    category: "Admin",
    amount: amount,
    date: new Date().toLocaleString()
  });

  DB.saveData(data);

  loadData();
}

function addExpense() {

  const categorySelect = document.getElementById("category").value;

  const other = document.getElementById("otherReason").value;

  const category = categorySelect === "Other" ? other : categorySelect;

  const amount = Number(document.getElementById("expenseAmount").value);

  const data = DB.getData();

  if (amount > data.balance) {

    data.overExpense = amount - data.balance;
    data.balance = 0;

  } else {

    data.balance -= amount;

  }

  data.transactions.push({
    type: "Expense",
    category: category,
    amount: amount,
    date: new Date().toLocaleString()
  });

  DB.saveData(data);

  loadData();
}

function checkOther() {

  const category = document.getElementById("category").value;

  const otherField = document.getElementById("otherReason");

  if (category === "Other") {

    otherField.classList.remove("d-none");

  } else {

    otherField.classList.add("d-none");

  }
}