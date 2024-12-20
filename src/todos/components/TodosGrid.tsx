'use client';

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";

import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todo-actions";

interface Props{
    todos?: Todo[]
}

export const TodosGrid = ({ todos = []}: Props) => {

    const router = useRouter();

    // const toogleTodo = async (id: string, done: boolean) => {
    //     await todosApi.updateTodo(id, done);

    //     router.refresh();
    // }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" >
            {
                todos.map(todo => {
                    return (
                        <TodoItem key={todo.id} todo={todo} toogleTodo={ toggleTodo } />
                    )
                })
            }
        </div>
    )
}
