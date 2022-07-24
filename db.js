let db;
let openRequest=indexedDB.open('myDatabase');

openRequest.addEventListener('success',()=>{
    console.log('db connected');
    db=openRequest.result;
})
openRequest.addEventListener("upgradeneeded",()=>{
db=openRequest.result;
db.createObjectStore('video',{keyPath:"id"});
db.createObjectStore('image',{keyPath:"id"});
})
openRequest.addEventListener('error',()=>{
    console.log('db error');
    
})