let List = document.querySelector(".list");
let input = document.querySelector(".additem");
let button = document.querySelector(".addbutton");
let filterSelect = document.querySelector(".filters");
displayList();

//event
button.addEventListener("click", addToList);
filterSelect.addEventListener("click", filterList);

function addToList(event) {
    event.preventDefault();
    console.log(input);
   
    let Div = document.createElement('li');
    Div.classList.add('item');

    

    var circlebutton = document.createElement('button');
    circlebutton.innerHTML = '<i class="far fa-check-circle"></i>';
    circlebutton.classList.add("circleButton");
    Div.appendChild(circlebutton);

    let tempItem = document.createElement('p');
    tempItem.innerText = input.value;
    tempItem.classList.add('p');
    Div.appendChild(tempItem);
    addItemInLocalStorage(input.value);

    let trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trashButton");
    Div.appendChild(trashbutton);
    
    if(input.value !== null)
        List.appendChild(Div);
    input.value = "";
}


List.addEventListener("click", markAndTrashDelete);

function markAndTrashDelete(event) {
    let tempItem = event.target;
    
    if (tempItem.classList[0] === "circleButton") {
        let checkItem = tempItem.parentElement;
        console.log(checkItem);
        checkItem.classList.toggle('checked');
        tempItem.classList.toggle('check');
        console.log(checkItem.children[1].innerText );
        console.log(checkItem.classList.contains("checked"));
        updateItemStateInLocalStorage(checkItem.children[1].innerText, checkItem.classList.contains("checked"));
    }

    
    else if (tempItem.classList[0] === "trashButton") {
        let removeItem = tempItem.parentElement;
       
        deleteItemFromLocalStorage(removeItem.children[1].innerText);
        removeItem.remove();
    }

}

function addItemInLocalStorage(tempItem) {

    let localList;

    if(window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
     }
     else localList = []; 

    localList.push({name: tempItem, done: false});
    window.localStorage.setItem("localList", JSON.stringify(localList));
    
}

function displayList() {
    let localList;

    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    }
    else localList = [];

    localList.forEach(element => {

        let Div = document.createElement('li');
        if (element.done)
            Div.classList.add('item', 'checked');
        else Div.classList.add('item');

        var circlebutton = document.createElement('button');
        circlebutton.innerHTML = '<i class="far fa-check-circle"></i>';
        if (element.done) circlebutton.classList.add("circleButton", "check");
        else circlebutton.classList.add("circleButton");
        Div.appendChild(circlebutton);

        let tempItem = document.createElement('p');
        tempItem.innerText = element.name;
        tempItem.classList.add('p');
        Div.appendChild(tempItem);

        let trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        trashbutton.classList.add("trashButton");
        Div.appendChild(trashbutton);

        
            List.appendChild(Div);
        
    });
    
}

function updateItemStateInLocalStorage(text, state) {
    let localList;

    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    }
    else localList = [];
    localList.forEach(i => {
        if(i.name === text) {
            i.done = state;
        }
    });
    window.localStorage.setItem("localList", JSON.stringify(localList));
    
    
}

function deleteItemFromLocalStorage(text) {

    let localList;

    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    }
    else localList = [];
   localList = localList.filter(i => i.name !== text);
    window.localStorage.setItem("localList", JSON.stringify(localList));
}

function filterList(event) {
    const todos = List.childNodes;
    
    console.log(todos);
    todos.forEach(todo => {
      
        switch (event.target.value) {
            case "all": todo.style.display = '';
                break;

            case "complete": if (todo.classList.contains('checked')){
                todo.style.display = '';
            } else{
                todo.style.display = 'none';
            } break;

            case "undone": if (todo.classList.contains('checked')) {
                todo.style.display = 'none';
            } else {
                todo.style.display = '';
            } break;
    }
    

    })
    
}







