function addProduct(){

const db = DB.getData();

const name = document.getElementById("name").value;

const category = document.getElementById("category").value;

const sku = document.getElementById("sku").value;

const pieces = Number(document.getElementById("pieces").value);

const location = document.getElementById("location").value;

let product = db.products.find(p => p.sku === sku);

if(product){

product.totalPieces += pieces;

product.availablePieces += pieces;

product.lastUpdated = new Date().toLocaleString();

}else{

db.products.push({

productName:name,
category:category,
sku:sku,
totalPieces:pieces,
availablePieces:pieces,
location:location,
lastUpdated:new Date().toLocaleString()

});

}

DB.saveData(db);

alert("Stock Added");

}