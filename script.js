// Categories array
let categories = [
  {
    title: "Personal",
    img: "boy.png",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Coding",
    img: "web-design.png",
  },
  {
    title: "Health",
    img: "healthcare.png",
  },
  {
    title: "Fitness",
    img: "dumbbell.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Finance",
    img: "saving.png",
  },
];

// Tasks array
let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  {
    id: 3,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 4,
    task: "Complete coding challenge",
    category: "Coding",
    completed: false,
  },
  {
    id: 5,
    task: "Take a 30-minute walk",
    category: "Health",
    completed: false,
  },
];

// Function to save tasks to localStorage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to get tasks from localStorage
const getLocal = () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
};

// Function to update totals display
const updateTotals = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      selectedCategory &&
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  numTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

// Function to render categories
const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    // Get tasks count for this category
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );
    const categoryTasksCount = categoryTasks.length;

    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      screenWrapper.classList.add("show-category");
      selectedCategory = category;
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `${category.img}`;
      renderTasks();
      updateTotals();
    });

    div.innerHTML = `
      <div class="left">
        <img src="${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasksCount} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
      </div>
    `;
    categoriesContainer.appendChild(div);
  });
};

// Function to render tasks for selected category
const renderTasks = () => {
  tasksContainer.innerHTML = "";
  if (!selectedCategory) {
    selectedCategory = categories[0];
  }
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  categoryTasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task-wrapper");
    const label = document.createElement("label");
    label.classList.add("task");
    label.setAttribute("for", task.id);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = task.id;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks[index].completed = !tasks[index].completed;
      // Call all required functions after task mutation
      saveLocal();
      renderTasks();
      renderCategories();
      updateTotals();
    });

    div.innerHTML = `
      <div class="delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
    `;

    label.innerHTML = `
      <span class="checkmark">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
      ${task.task}
    `;

    label.prepend(checkbox);
    div.prepend(label);
    tasksContainer.appendChild(div);

    // Add delete functionality
    const deleteBtn = div.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      // Call all required functions after task mutation
      saveLocal();
      renderTasks();
      renderCategories();
      updateTotals();
    });
  });
};

// Toggle add task form
const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

// Toggle screen
const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

// Add task function
const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const category = categorySelect.value;
  if (task === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      task,
      category,
      completed: false,
    };
    tasks.push(newTask);
    // Call all required functions after task mutation
    saveLocal();
    renderTasks();
    renderCategories();
    updateTotals();
    // Clear form fields and close form
    taskInput.value = "";
    categorySelect.selectedIndex = 0;
    if (addTaskWrapper.classList.contains("active")) {
      toggleAddTaskForm();
    }
  }
};

// DOM elements
const categoriesContainer = document.querySelector(".categories");
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const tasksContainer = document.querySelector(".tasks");
const numTasks = document.querySelector("#num-tasks");
const categoryTitle = document.querySelector("#category-title");
const categoryImg = document.querySelector("#category-img");
const categorySelect = document.querySelector("#category-select");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.querySelector("#task-input");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.querySelector("#total-tasks");

let selectedCategory = categories[0];

// Event listeners
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);

// Initialize the app
getLocal();
renderTasks();
renderCategories();
updateTotals();

// Populate category select dropdown
categorySelect.innerHTML = "";
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title;
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

// Set initial category display
if (selectedCategory) {
  categoryTitle.innerHTML = selectedCategory.title;
  categoryImg.src = `${selectedCategory.img}`;
}
