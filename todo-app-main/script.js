const todosContainer = document.querySelector(".todos");
const todosFooter = document.querySelector(".todos-footer");
const todosFooterMobile = document.querySelector(".todos-footer-mobile");
const createTodoCheckradio = document.querySelector(
  ".create-todo-container .checkradio"
);
const createTodoContainer = document.querySelector(".create-todo-container");
const createTodoCheckbox = document.querySelector(
  ".create-todo-container input[type='checkbox']"
);
const createTodoInput = document.querySelector(
  ".create-todo-container input[type='text']"
);
const totalItems = document.querySelector(".total-items");

let todos = [];

const updateDOM = () => {
  if (todos.length === 0) {
    createTodoCheckradio.style.visibility = "hidden";
    todosFooter.style.visibility = "hidden";
    todosContainer.style.visibility = "hidden";
    todosFooterMobile.style.visibility = "hidden";
  } else {
    createTodoCheckradio.style.visibility = "";
    todosContainer.style.visibility = "";
    todosFooter.style.visibility = "";
    todosFooterMobile.style.visibility = "";
  }

  totalItems.textContent = `${todos.length} items left`;
};

updateDOM();

const changeTheme = () => {
  document.body.classList.toggle("dark");
};

createTodoInput.addEventListener("keyup", (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    const id = todos.length + 1;
    const { value } = event.target;

    event.preventDefault();
    todos.push({
      id,
      value,
      checked: false,
    });
    updateDOM();
    totalItems.textContent = `${todos.length} items left`;
    createTodoCheckradio.style.visibility = "unset";
    createTodo(id, event.target.value);
    event.target.value = "";
  }
});

createTodoCheckradio.addEventListener("click", (event) => {
  const allTodoCheckboxes = Array.from(
    document.querySelectorAll(".todo input[type='checkbox']")
  );
  if (createTodoCheckbox.checked) {
    todos.forEach((todo) => {
      todo.checked = false;
    });
    allTodoCheckboxes.forEach((item) => {
      item.checked = false;
    });
  } else {
    todos.forEach((todo) => {
      todo.checked = true;
    });
    allTodoCheckboxes.forEach((item) => {
      item.checked = true;
    });
  }
});

// Create Todo
const createTodo = (id, todoString) => {
  const todoLabel = document.createElement("label");
  todoLabel.textContent = todoString;
  todoLabel.classList.add("todo-label");
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const checkradio = document.createElement("label");
  checkradio.classList.add("checkradio");

  let obj = todos.find((todo) => todo.id === id);
  checkradio.addEventListener("click", (event) => {
    if (checkbox.checked) {
      obj.checked = false;
      checkbox.checked = false;
    } else {
      obj.checked = true;
      checkbox.checked = true;
    }

    const todoindex = todos.findIndex((todo) => todo.id === id);

    todos[todoindex].checked = obj.checked;

    if (todos.every((todo) => todo.checked === true)) {
      createTodoCheckbox.checked = true;
    } else {
      createTodoCheckbox.checked = false;
    }
  });

  const crossIconContainer = document.createElement("div");
  crossIconContainer.classList.add("icon-cross");
  crossIconContainer.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.id !== id);
    totalItems.textContent = `${todos.length} items left`;
    todo.remove();

    if (todos.length === 0) {
      createTodoCheckbox.checked = false;
      createTodoCheckradio.style.visibility = "hidden";
    }
    updateDOM();
  });
  const crossIcon = document.createElement("img");
  crossIcon.src = "./images/icon-cross.svg";

  todo.appendChild(checkbox);
  todo.appendChild(checkradio);
  todo.appendChild(todoLabel);
  crossIconContainer.appendChild(crossIcon);
  todo.appendChild(crossIconContainer);

  todosContainer.insertBefore(todo, todosFooter);
};

const clearCompleted = () => {
  todos = todos.filter((todo) => !todo.checked);
  if (todos.length === 0) {
    createTodoCheckbox.checked = false;
    createTodoCheckradio.style.visibility = "hidden";
  }

  document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector("input").checked) {
      todo.remove();
    }
  });
  updateDOM();
};
const filterAll = (event) => {
  document.querySelectorAll("a.active").forEach((item) => {
    item.classList.remove("active");
  });
  event.target.classList.toggle("active");
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "flex";
  });
};
const filterActive = (event) => {
  document.querySelectorAll("a.active").forEach((item) => {
    item.classList.remove("active");
  });
  event.target.classList.toggle("active");
  document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector("input").checked) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
};
const filterCompleted = (event) => {
  document.querySelectorAll("a.active").forEach((item) => {
    item.classList.remove("active");
  });
  event.target.classList.toggle("active");
  document.querySelectorAll(".todo").forEach((todo) => {
    if (!todo.querySelector("input").checked) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
};
