// INIT DB
function getDB() {
  return JSON.parse(localStorage.getItem("inventoryDB")) || {
    users: [
      { role: "buyer", username: "buyer", password: "buyer" },
      { role: "manager", username: "manager", password: "manager" },
      { role: "incharge", username: "incharge", password: "incharge" }
    ],
    entries: [],
    stock: [],
    requests: []
  };
}

function saveDB(db) {
  localStorage.setItem("inventoryDB", JSON.stringify(db));
}

// LOGIN
function login() {
  let u = username.value;
  let p = password.value;

  let db = getDB();
  let user = db.users.find(x => x.username === u && x.password === p);

  if (!user) return alert("Invalid");

  localStorage.setItem("user", JSON.stringify(user));

  location.href = user.role + ".html";
}

// BUYER
function submitEntry() {
  let db = getDB();

  db.entries.push({
    id: Date.now(),
    lorry: lorry.value,
    date: date.value,
    material: material.value,
    qty: Number(qty.value),
    from: from.value,
    to: to.value,
    status: "pending"
  });

  saveDB(db);
  alert("Saved");
}

// MANAGER LOAD
function loadManager() {
  let db = getDB();

  // Pending Entries
  entries.innerHTML = db.entries
    .filter(e => e.status === "pending")
    .map(e => `
      <tr>
        <td>${e.lorry}</td>
        <td>${e.material}</td>
        <td>${e.qty}</td>
        <td>
          <button class="btn btn-sm btn-success me-2" onclick="approve(${e.id})">Approve</button>
          <button class="btn btn-sm btn-danger" onclick="reject(${e.id})">Reject</button>
        </td>
      </tr>
    `).join("");

  // Stock
  stock.innerHTML = db.stock
    .map(s => `
      <tr>
        <td>${s.material}</td>
        <td>${s.qty}</td>
      </tr>
    `).join("");

  // Requests
  requests.innerHTML = db.requests
    .filter(r => r.status === "pending")
    .map(r => `
      <tr>
        <td>${r.material}</td>
        <td>${r.qty}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="approveReq(${r.id})">Approve</button>
        </td>
      </tr>
    `).join("");
}
// APPROVE ENTRY
function approve(id) {
  let db = getDB();
  let e = db.entries.find(x => x.id === id);

  e.status = "approved";

  let s = db.stock.find(x => x.material === e.material);
  if (s) s.qty += e.qty;
  else db.stock.push({ material: e.material, qty: e.qty });

  saveDB(db);
  loadManager();
}

// REJECT
function reject(id) {
  let db = getDB();
  db.entries.find(x => x.id === id).status = "rejected";
  saveDB(db);
  loadManager();
}

// INCHARGE LOAD
function loadIncharge() {
  let db = getDB();

  stock.innerHTML = db.stock.length
    ? db.stock.map(s => `
        <tr>
          <td>${s.material}</td>
          <td>${s.qty}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="text-center">No stock available</td></tr>`;
}

// REQUEST
function requestMaterial() {
  let db = getDB();

  db.requests.push({
    id: Date.now(),
    material: material.value,
    qty: Number(qty.value),
    status: "pending"
  });

  saveDB(db);
  alert("Requested");
}

// APPROVE REQUEST
function approveReq(id) {
  let db = getDB();

  let r = db.requests.find(x => x.id === id);
  let s = db.stock.find(x => x.material === r.material);

  if (!s || s.qty < r.qty) return alert("No stock");

  s.qty -= r.qty;
  r.status = "approved";

  saveDB(db);
  loadManager();
}