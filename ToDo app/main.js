let form = document.getElementById("form");
let todo = document.getElementById("todo");
let todolist = document.getElementById("todolist");

form.addEventListener("submit",e=>{
    e.preventDefault();
    createItem(todo.value);
});

function createItem(x){
    if(x!=""){
        let listItem = `<li> ${x} <button onclick="deleteItem(this)">Delete</button> </li>`;
        todolist.insertAdjacentHTML("beforeend",listItem);
        todo.value = "";
        todo.focus();
    }
}

function deleteItem(deleteElement){
    deleteElement.parentElement.remove();
}