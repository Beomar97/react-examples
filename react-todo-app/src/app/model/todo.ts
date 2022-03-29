import { Place } from "./place"

export type Todo = Readonly<{
    id: number
    text: string
    done: boolean
    place?: Place
  }>
  
export type CompletedTodo = Todo & {
  readonly done: true
}