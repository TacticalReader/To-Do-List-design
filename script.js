img alt="${category.title}" src="${category.img}"

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
  {
    id: 6,
    task: "Do a 20-minute HIIT workout",
    category: "Fitness",
    completed: false,
  },
  {
    id: 7,
    task: "Watch an educational video online",
    category: "Education",
    completed: false,
  },
  {
    id: 8,
    task: "Review monthly budget",
    category: "Finance",
    completed: false,
  },
  {
    id: 9,
    task: "Buy groceries for the week",
    category: "Shopping",
    completed: false,
  },
  {
    id: 10,
    task: "Write in a journal",
    category: "Personal",
    completed: false,
  },
  {
    id: 11,
    task: "Send follow-up emails",
    category: "Work",
    completed: false,
  },
  {
    id: 12,
    task: "Work on a coding side project",
    category: "Coding",
    completed: false,
  },
  {
    id: 13,
    task: "Try a new healthy recipe",
    category: "Health",
    completed: false,
  },
  {
    id: 14,
    task: "Attend a yoga class",
    category: "Fitness",
    completed: false,
  },
  {
    id: 15,
    task: "Read an article about a new topic",
    category: "Education",
    completed: false,
  },
  {
    id: 16,
    task: "Set up automatic bill payments",
    category: "Finance",
    completed: false,
  },
  // Additional tasks for each category
  {
    id: 17,
    task: "Buy new clothes",
    category: "Shopping",
    completed: false,
  },
  {
    id: 18,
    task: "Meditate for 10 minutes",
    category: "Personal",
    completed: false,
  },
  {
    id: 19,
    task: "Prepare agenda for team meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 20,
    task: "Debug a software issue",
    category: "Coding",
    completed: false,
  },
  {
    id: 21,
    task: "Try a new recipe for lunch",
    category: "Health",
    completed: false,
  },
  {
    id: 22,
    task: "Go for a run",
    category: "Fitness",
    completed: false,
  },
  {
    id: 23,
    task: "Learn a new language online",
    category: "Education",
    completed: false,
  },
  {
    id: 24,
    task: "Read about history",
    category: "Education",
    completed: false,
  },
  {
    id: 25,
    task: "Review investment portfolio",
    category: "Finance",
    completed: false,
  },
  // Add more tasks for each category as desired
];

// Define functions
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
@@ -202,8 +203,10 @@
const updateTotals = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      selectedCategory &&
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  // Ensure safety if selectedCategory is not yet set
  numTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};
@@ -233,7 +236,7 @@
              </div>
              <div class="options">
                <div class="toggle-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
@@ -255,6 +258,10 @@
};
const renderTasks = () => {
  tasksContainer.innerHTML = "";
  if (!selectedCategory) {
    // If no category selected yet, default to first
    selectedCategory = categories[0];
  }
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
@@ -276,10 +283,13 @@
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
        // Keep UI consistent after toggle
        updateTotals();
        renderCategories();
      });
      div.innerHTML = `
      <div class="delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
@@ -297,7 +307,7 @@
              `;
      label.innerHTML = `
              <span class="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
@@ -336,24 +346,31 @@
};
const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const category = categorySelect.value;
  if (task === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1, // ensure unique id
      task,
      category,
      completed: false,
    };

    tasks.push(newTask);
    saveLocal();

    // UI updates: re-render lists and totals
    renderTasks();
    renderCategories();
    updateTotals();

    // Clear inputs and close form
    taskInput.value = "";
    categorySelect.selectedIndex = 0;
    if (addTaskWrapper.classList.contains("active")) {
      toggleAddTaskForm();
    }
  }
};
// Initialize variables and DOM elements
@@ -385,9 +402,29 @@
getLocal();
renderTasks();
renderCategories();
updateTotals();

// Ensure categorySelect is populated and not skipped
categorySelect.innerHTML = ""; // reset to avoid duplicates on hot reload
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title; // use consistent case for value
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

// If a category was previously selected, keep UI in sync
if (selectedCategory) {
  categoryTitle.innerHTML = selectedCategory.title;
  categoryImg.src = `${selectedCategory.img}`;
}

/*
Fixes applied:
1) Task count updates correctly after add/delete via updateTotals() calls after mutations.
2) renderTasks() and renderCategories() are called after every change (add, delete, toggle complete).
3) UI input fields are cleared and the add form closes after add; categorySelect reset to first option.
4) Category render is not skipped: renderCategories() invoked on init and after mutations; categorySelect populated safely without duplicates.
5) Unique ID generation fixed to avoid duplicates after deletions.
6) Defensive checks for selectedCategory and added initial updateTotals() call on init.
*/
