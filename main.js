// Selectors
let list = document.querySelector(".list");
let input = document.querySelector(".additem");
let button = document.querySelector(".addbutton");
let filterSelect = document.querySelector(".filters");

// Function Call
displayList();

//eventListener
button.addEventListener("click", addToList);
list.addEventListener("click", markAndTrashDelete);
filterSelect.addEventListener("change", filterList);

// Functions
function itemCreation(value) {
    let listItem = document.createElement('li');
    listItem.classList.add('item');

    var circlebutton = document.createElement('button');
    circlebutton.innerHTML = '<i class="far fa-check-circle"></i>';
    circlebutton.classList.add("circleButton");
    listItem.appendChild(circlebutton);

    let tempItem = document.createElement('p');
    tempItem.innerText = value;
    tempItem.classList.add('p');
    listItem.appendChild(tempItem);

    let trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trashButton");
    listItem.appendChild(trashbutton);


    return listItem;
    
}
function addToList(event) {
    
    if(input.value === null) return;
    event.preventDefault();
    addItemInLocalStorage(input.value);
    list.appendChild(itemCreation(input.value));
    input.value = "";
}

function markAndTrashDelete(event) {
    let tempItem = event.target;
    if (tempItem.classList[0] === "circleButton") {
        let checkItem = tempItem.parentElement;
        checkItem.classList.toggle('checked');
        updateItemStateInLocalStorage(checkItem.children[1].innerText, checkItem.classList.contains("checked"));
    }else if (tempItem.classList[0] === "trashButton") {
        let removeItem = tempItem.parentElement;
        deleteItemFromLocalStorage(removeItem.children[1].innerText);
        removeItem.remove();
    }
}

function createLocalList() {
    let localList;
    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    }else localList = [];
    return localList;
}

function addItemInLocalStorage(tempItem) {
    let localList = createLocalList();
    localList.push({name: tempItem, done: false});
    window.localStorage.setItem("localList", JSON.stringify(localList));
}

function displayList() {
    let localList = createLocalList();
    localList.forEach(element => {
        let listItem = itemCreation(element.name);
        if(element.done) listItem.classList.add('checked');
        list.appendChild(listItem);
    });
}

function updateItemStateInLocalStorage(text, state) {
    let localList = createLocalList();
    localList.forEach(i => {
        if(i.name === text) {
            i.done = state;
        }
    });
    window.localStorage.setItem("localList", JSON.stringify(localList));
    
    
}

function deleteItemFromLocalStorage(text) {
    let localList = createLocalList();
    localList = localList.filter(i => i.name !== text);
    window.localStorage.setItem("localList", JSON.stringify(localList));
}

function filterList(event) {
    const todos = list.childNodes;
    todos.forEach(todo => {
      
        switch (event.target.value) {
            case "all": todo.style.display = '';
                break;

            case "1": if (todo.classList.contains('checked')){
                todo.style.display = '';
            } else{
                todo.style.display = 'none';
            } break;

            case "0": if (todo.classList.contains('checked')) {
                todo.style.display = 'none';
            } else {
                todo.style.display = '';
            } break;
        }
    });
}







