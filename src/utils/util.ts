import { Attribute } from '../interfaces/attribute.interface.js'
export const createElement = (
  element: string,
  text?: string,
  ...atrib: Attribute[]
): HTMLElement => {
  const _element = document.createElement(element)
  _element.innerText = text
  atrib.forEach((val) => _element.setAttribute(val.attrib, val.value))
  return _element
}

export const getElements = () => {
  return {
    taskForm: document.querySelector('.create-task-block') as HTMLFormElement,
    tasksList: document.querySelector('.tasks-list') as HTMLDivElement,
    taskError: document.querySelector('.error-message-block') as HTMLDivElement,
    modal: document.querySelector('.modal-overlay') as HTMLDivElement,
  }
}

export type theme = 'light' | 'dark'

export const changeTheme = (theme: theme) => {
  switch (theme) {
    case 'light':
      document.querySelector<HTMLBodyElement>('body').style.background =
        'initial'
      document.querySelectorAll<HTMLDivElement>('.task-item').forEach((val) => {
        val.style.color = 'initial'
      })
      document.querySelectorAll<HTMLButtonElement>('button').forEach((val) => {
        val.style.border = 'none'
      })
      break
    case 'dark':
      document.querySelector<HTMLBodyElement>('body').style.background =
        '#24292E'
      document.querySelectorAll<HTMLDivElement>('.task-item').forEach((val) => {
        val.style.color = '#ffffff'
      })
      document.querySelectorAll<HTMLButtonElement>('button').forEach((val) => {
        val.style.border = '1px solid #ffffff'
      })
      break
  }
}
