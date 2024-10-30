import { createElement, getElements } from './utils/util.js'
import { tasks } from './DB/task.db.js'
import { ITaskFormEvent } from './interfaces/task-form.event.interface.js'
import { ITask } from './interfaces/task.interface.js'

const taskManager = () => {
  const { taskForm, tasksList } = getElements()
  tasks.forEach((val, index) => {
    const taskItem = createElement(
      'div',
      null,
      {
        attrib: 'class',
        value: 'task-item',
      },
      { attrib: 'data-task-id', value: val.id },
    )
    const task = createElement(
      'div',
      val.text,
      {
        attrib: 'class',
        value: 'task-item__text',
      },
      { attrib: 'id', value: `task-${index + 1}` },
    )
    taskItem.append(task)
    tasksList.append(taskItem)
  })
  taskForm.addEventListener('submit', (e: SubmitEvent) => {
    const { taskError } = getElements()
    e.preventDefault()
    if (taskError) {
      taskError.remove()
    }
    const { target } = e as ITaskFormEvent
    const text: string = target.taskName.value
    if (!text) {
      const taskError = createElement('div', null, {
        attrib: 'class',
        value: 'error-message-block',
      })
      taskError.append(
        createElement('span', 'Название задачи не должно быть пустым'),
      )
      taskForm.append(taskError)
    } else if (tasks.find((value) => value.text === text)) {
      const taskError = createElement('div', null, {
        attrib: 'class',
        value: 'error-message-block',
      })
      taskError.append(
        createElement('span', 'Задача с таким названием уже существует.'),
      )
      taskForm.append(taskError)
    } else {
      const _newTask: ITask = {
        id: Date.now().toString(),
        text,
        completed: false,
      }
      tasks.push(_newTask)
      const taskItem = createElement(
        'div',
        null,
        { attrib: 'class', value: 'task-item' },
        { attrib: 'data-task-id', value: _newTask.id },
      )
      const newTaskElement = createElement(
        'div',
        text,
        {
          attrib: 'class',
          value: 'task-item__text',
        },
        { attrib: 'id', value: `task-${tasks.length}` },
      )
      taskItem.append(newTaskElement)
      tasksList.append(taskItem)
    }
  })
}

taskManager()
