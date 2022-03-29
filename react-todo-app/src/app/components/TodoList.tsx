import { useState, useEffect } from 'react';
import TodoItem from './TodoItem'
import InputBar from './InputBar';
import { CompletedTodo, Todo } from '../model/todo';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const todo1: Todo = {id: 0, text: "Dies ist ein Beispiel", done: false, place: 'home'}
        const todo2: Todo = {id: 1, text: "Dies ist ein weiteres Beispiel", done: true, place: 'work'}
        setTodos([todo1, todo2])
    }, []);

    const unfinishedTodo = todos.find(todo => todo.done === false);
    const notAllDone = unfinishedTodo != null ? true : false

    const completeAll = (todos: readonly Todo[]): CompletedTodo[] => {
        return todos.map(todo => ({
            ...todo,
            done: true
        }))
    }

    return (
        <Card sx={{ maxWidth: 600, padding: '15px' }}>
            <InputBar
                todos={todos}
                setTodos={setTodos} 
            />
            <div>
                {
                    todos.map((todo: Todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            done={todo.done}
                            place={todo.place}
                            setTodos={setTodos}
                        />
                    ))
                }
            </div>
            <div>
                {
                    notAllDone &&
                    <Button variant='text' onClick={() => setTodos(completeAll(todos))}>
                        Complete all
                    </Button>
                }
            </div>
        </Card>
    );
}

export default TodoList;