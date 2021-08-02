// Create the HTML for a task
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
    <li class="list-group-item align-items-center" data-task-id=${id}>
        <div class="d-flex w-100 mt-2 justify-content-between">
            <h5>${name}</h5>
            <span class="badge badge-danger" style="color: #000000;">${status}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <small>Assigned To: ${assignedTo}</small>
            <small>Due: ${dueDate}</small>
        </div>
        <p>${description}</p>
        <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-outline-success done-button ${status === 'TODO' ? 'visible' : 'invisible'}">Mark As Done</button>
        </div>
    </li>
`;


class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(name, description, assignedTo, dueDate) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'TODO'
        };

        this.tasks.push(task);
    };

    getTaskById(taskId) {
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++){
            const task = this.tasks[i];
        
            if (task.id === taskId) {
                foundTask = task;
            } 
        }
        return foundTask;
    }
    render(){
        const tasksHtmlList = [];
        //Loop over our tasks and create the html, storing it in the array
        for (let i=0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
            
            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;
    }
    save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);

        // Store the JSON string in localStorage
        localStorage.setItem('tasks', tasksJson);

        // Convert the currentId to a string;
        const currentId = String(this.currentId);

        // Store the currentId in localStorage
        localStorage.setItem('currentId', currentId);
    }

    // Create the load method
    load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem('tasks')) {
            // Get the JSON string of tasks in localStorage
            const tasksJson = localStorage.getItem('tasks');

            // Convert it to an array and store it in our TaskManager
            this.tasks = JSON.parse(tasksJson);
        }

        // Check if the currentId is saved in localStorage
        if (localStorage.getItem('currentId')) {
            // Get the currentId string in localStorage
            const currentId = localStorage.getItem('currentId');

            // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);
        }
    }
}

// const taskManager = new TaskManager();
// const task1 = {
//     name: 'Add task',
//     description: 'Add a task to our task list',
//     assignedTo: 'Bobby',
//     dueDate: '8-01-2021'
// }
// const task2 = {
//     name: 'Add second task',
//     description: 'Add a second task to our task list',
//     assignedTo: 'Bobby',
//     dueDate: '8-01-2021'
// }
// taskManager.addTask(task1.name, task1.description, task1.assignedTo, task1.dueDate);
// taskManager.addTask(task2.name, task2.description, task2.assignedTo, task2.dueDate);
// console.log(taskManager.tasks);