document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksContainer = document.getElementById('tasksContainer');
    const taskInput = document.getElementById('taskInput');

    function createTaskElement(taskText) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            taskDiv.classList.toggle('completed');
        });

        const taskContent = document.createElement('p');
        taskContent.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', () => {
            tasksContainer.removeChild(taskDiv);
        });

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskContent);
        taskDiv.appendChild(deleteBtn);

        return taskDiv;
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            tasksContainer.appendChild(taskElement);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});
