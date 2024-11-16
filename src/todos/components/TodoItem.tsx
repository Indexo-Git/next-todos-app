'use client';

import { Todo } from "@prisma/client"
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"
import { startTransition, useOptimistic } from "react";

interface Props {
    todo: Todo,
    toogleTodo:
    (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({todo, toogleTodo}: Props) => {

    const [todoOptimistic, toggleTodoOptimistic ] = useOptimistic(
        todo,
        (state, newCompleteValue: boolean) => ({...state, done: newCompleteValue})
    );

    const onToggleTodo = async () => {
        try{
            startTransition(() => toggleTodoOptimistic(!todoOptimistic.done) );
            await toogleTodo(todoOptimistic.id, !todoOptimistic.done);
        }catch(error){
            console.error(error)
            startTransition(() => toggleTodoOptimistic(!todoOptimistic.done) );
        }
    }

  return (
    <div className={ todoOptimistic.done ? styles.todoDone : styles.todoPending }>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div 
            onClick={ onToggleTodo }
            className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todoOptimistic.done ? 'bg-blue-200' : 'bg-red-200'}
            `}>
                {
                    todoOptimistic.done 
                    ? <IoCheckboxOutline size={30} color="green" />
                    : <IoSquareOutline size={30} />
                }
            </div>
            <div className="text-center sm:text-left">
                <h3 className="font-bold">{todoOptimistic.description}</h3>
            </div>
        </div>
    </div>
  )
}
