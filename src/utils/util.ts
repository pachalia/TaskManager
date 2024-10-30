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
  }
}
