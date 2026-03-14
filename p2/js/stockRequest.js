function requestStock(){

const db = DB.getData();

const section = document.getElementById("section").value;

const sku = document.getElementById("sku").value;

const qty = Number(document.getElementById("qty").value);

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

db.movements.push({

productName:product.productName,
quantity:qty,
from:"Gudown",
to:section,
date:new Date().toLocaleString()

});

DB.saveData(db);

alert("Stock Sent");

}