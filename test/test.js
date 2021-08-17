const assert = require('assert');

const TaskManager = require('../js/taskManager')

describe('TaskManager', () => {
    describe('.getTaskById()', () => {
        it('Should return a task object with id property matching input id', () => {
            const taskManager = new TaskManager();
            const targetId = 1;
            const task1 = {
                project: 'Test',
                name: 'Test',
                description: 'Test',
                assignTo: 'Test',
                dueDate: '08-02-2021',
                id: targetId
            };
            taskManager.addTask(task1.project, task1.name, task1.description, task1.assignTo, task1.status, task1.dueDate, task1.id);
            assert.strictEqual(taskManager.getTaskById(targetId).id, targetId);
        })
    })
    describe('.addTask', () => {
        it('Should push an array  to this.tasks', () => {
            const taskManager = new TaskManager(0);
            const expected = {
                id: 0,
                name: 'Test',
                description: 'Test',
                assignedTo: 'Test',
                dueDate: '08-02-2021',
                status: 'TODO'
            };
            
            taskManager.addTask(
                expected.name,
                expected.description,
                expected.assignedTo,
                expected.dueDate,
                expected.status
            );
            const result = taskManager.tasks[0];
            assert.deepEqual(result, expected);

        });
    });
});