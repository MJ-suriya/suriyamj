function loadInventory() {

const db = DB.getData();

const products = db.products;

document.getElementById("totalProducts").innerText = products.length;

let totalPieces = 0;

const table = document.getElementById("inventoryTable");

table.innerHTML = "";

products.forEach(p => {

totalPieces += p.availablePieces;

const lowStock = p.availablePieces < 30
? "<span class='text-danger fw-bold'>Low Stock</span>"
: "<span class='text-success'>OK</span>";

table.innerHTML += `
<tr>
<td>${p.productName}</td>
<td>${p.category}</td>
<td>${p.sku}</td>
<td>${p.availablePieces}</td>
<td>${p.location}</td>
<td>${lowStock}</td>
</tr>
`;

});

document.getElementById("totalPieces").innerText = totalPieces;

}

loadInventory();



function wentForSales(){

const db = DB.getData();

const sku = document.getElementById("salesSku").value.trim();

const qty = Number(document.getElementById("salesQty").value);

if(!sku || !qty){

alert("Enter SKU and Quantity");

return;

}

const product = db.products.find(p => p.sku === sku);

if(!product){

alert("Product not found");

return;

}

if(product.availablePieces < qty){

alert(`Only ${product.availablePieces} pieces available`);

return;

}

product.availablePieces -= qty;

product.lastUpdated = new Date().toLocaleString();

DB.saveData(db);

loadInventory();

document.getElementById("salesSku").value = "";
document.getElementById("salesQty").value = "";

alert("Inventory updated");

}