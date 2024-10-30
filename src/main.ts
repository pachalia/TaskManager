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
    e.preventDefault()
    const { target } = e as ITaskFormEvent
    const text: string = target.taskName.value
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
  })
}

taskManager()
