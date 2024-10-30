export interface ITaskFormEvent extends SubmitEvent, MouseEvent {
  target: HTMLElement & { taskName: { value: string } }
}
