export interface ITaskFormEvent extends SubmitEvent {
  target: HTMLElement & { taskName: { value: string } }
}