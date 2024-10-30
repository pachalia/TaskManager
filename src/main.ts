import { createElement, getElements } from './utils/util.js'
import { tasks } from './DB/task.db.js'
import { ITaskFormEvent } from './interfaces/task-form.event.interface.js'
import { ITask } from './interfaces/task.interface.js'
import { IModalEvent } from './interfaces/modal-event.interface.js'

const taskManager = () => {
  const { taskForm, tasksList, modal } = getElements()
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
    const taskItemButtonDelete = createElement('button', 'Удалить', {
      attrib: 'class',
      value: 'task-item__delete-button default-button delete-button',
    })
    taskItem.append(task, taskItemButtonDelete)
    tasksList.append(taskItem)
  })
  taskForm.addEventListener('submit', (e: SubmitEvent) => {
    const { taskError } = getElements()
    e.preventDefault()
    taskError ? taskError.remove() : null
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
      const taskItemButtonDelete = createElement('button', 'Удалить', {
        attrib: 'class',
        value: 'task-item__delete-button default-button delete-button',
      })
      taskItem.append(newTaskElement, taskItemButtonDelete)
      tasksList.append(taskItem)
    }
  })
  tasksList.addEventListener('click', (e: MouseEvent) => {
    const { target: taskTarget } = e as ITaskFormEvent
    taskTarget.classList.contains('delete-button')
      ? document
          .querySelector('.modal-overlay')
          .classList.remove('modal-overlay_hidden')
      : null
    if (taskTarget.classList.contains('delete-button')) {
      document
        .querySelector('.modal-overlay')
        .classList.remove('modal-overlay_hidden')
      modal.addEventListener('click', (e) => {
        const { target: modalTarget } = e as IModalEvent
        const { taskError } = getElements()
        taskError ? taskError.remove() : null
        if (modalTarget.classList.contains('delete-modal__confirm-button')) {
          const deleteTask =
            taskTarget.closest<HTMLDivElement>('[data-task-id]')
          deleteTask.remove()
          tasks.forEach((val, i) =>
            val.id === deleteTask.dataset.taskId ? tasks.splice(i, 1) : null,
          )
          modal.classList.add('modal-overlay_hidden')
        } else {
          modal.classList.add('modal-overlay_hidden')
        }
      })
    }
  })
}

taskManager()
