
const taskManager = new TaskManager(0);

// Load the tasks from localStorage
taskManager.load();

// Render the tasks to the page
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();
    let messages = [];

    // Select the inputs
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    
    
    /*
        Validation code here
    */

    // Get the values of the inputs
    const taskName = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;
    

taskManager.addTask(taskName, description, assignedTo, dueDate, status);

taskManager.save();

taskManager.render();

newTaskNameInput.value = '';
newTaskDescription.value = '';
newTaskAssignedTo.value = '';
newTaskDueDate.value = '';
});

const tasksList = document.querySelector('#tasksList');

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'DONE';

        // Save the tasks to localStorage
        taskManager.save();

        taskManager.render();
    }
});
