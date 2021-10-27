let todos = [
    {
        content: 'House keeping',
        completed: true,
    },

    {
        content: 'Wash dishes',
        completed: false,
    },

    {
        content: 'Shopping',
        completed: true,
    },
];

// ---------------------------
{
    /* <label class="list-group-item ${todo.completed ? 'texxt' : ''}">
<input
    class="form-check-input me-1"
    type="checkbox"
    value=""
    ${todo.completed ? 'checked' : ''} 
/>
${todo.content}
</label> */
}

// ---------------------------

let listItem = document.querySelector('.listItem');

let displayItem = (todos) => {
    let itemString = todos
        .map((todo) => {
            return `
            <li class="list-group-item ${todo.completed ? 'texxt' : ''}">
            <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                ${todo.completed ? 'checked' : ''} 
            />
            ${todo.content}
        </li>
    `;
        })
        .join('');

    listItem.innerHTML = itemString;

    // quantity
    document.querySelector('.footer .todo-count strong').innerHTML =
        todos.filter((todo) => todo.completed === false).length;

    // if no completed items then hidden button complete

    if (todos.filter((todo) => todo.completed === true).length == 0) {
        document.querySelector('.footer button').classList.add('d-none');
    } else {
        document.querySelector('.footer button').classList.remove('d-none');
    }

    // check or not
    let listGroup = document.querySelector('.list-group-item');
    let completedBTNs = document.querySelectorAll('.list-group-item input');

    completedBTNs.forEach((completed, index) => {
        completed.addEventListener('click', (event) => {
            event.preventDefault();
            if (completed.hasAttribute('checked')) {
                listGroup.classList.remove('texxt');
                todos[index].completed = false;
            } else {
                listGroup.classList.add('texxt');
                todos[index].completed = true;
            }
            displayItem(todos);
        });
    });

    let deleteTodo = document.querySelector('.clear-completed');

    deleteTodo.addEventListener('click', (event) => {
        event.preventDefault();

        todos.map((todo, index) => {
            if (todo.completed === true) {
                todos.splice(index, 1);
            }
        });

        displayItem(todos);
    });
};

displayItem(todos);

let enterTodo = document.querySelector('.add-todo .inputBTN');

enterTodo.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        let todoContent = document.querySelector('.inputBTN').value;

        if (todoContent) {
            todos.push({
                content: todoContent,
                completed: false,
            });
            displayItem(todos);
        }
        document.querySelector('.inputBTN').value = '';
    }
});

let allTodos = document.querySelector('.filters .all');
let activeTodos = document.querySelector('.filters .active');
let completedTodos = document.querySelector('.filters .completed');

allTodos.addEventListener('click', (event) => {
    event.preventDefault();
    displayItem(todos);
    document.querySelectorAll('.footer li a').forEach((item) => {
        console.log(item);
        if (item.classList.contains('selected')) {
            item.classList.remove('selected');
        }
    });
    document.querySelector('.footer .all a').classList.add('selected');
});

activeTodos.addEventListener('click', (event) => {
    event.preventDefault();
    let active = todos.filter((todo) => todo.completed === false);

    displayItem(active);
    document.querySelectorAll('.footer li a').forEach((item) => {
        item.classList.remove('selected');
    });
    document.querySelector('.footer .active a').classList.add('selected');
});

completedTodos.addEventListener('click', (event) => {
    let active = todos.filter((todo) => todo.completed === true);

    displayItem(active);
    document.querySelectorAll('.footer li a').forEach((item) => {
        item.classList.remove('selected');
    });
    document.querySelector('.footer .completed a').classList.add('selected');
});
