const DB = {

getData(){

let data = localStorage.getItem("inventoryDB");

if(!data){

const defaultDB = {

products:[],
movements:[]

};

localStorage.setItem("inventoryDB", JSON.stringify(defaultDB));

return defaultDB;

}

return JSON.parse(data);

},

saveData(data){

localStorage.setItem("inventoryDB", JSON.stringify(data));

}

};