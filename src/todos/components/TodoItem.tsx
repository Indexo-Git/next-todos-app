'use client';

import { Todo } from "@prisma/client"
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"

interface Props {
    todo: Todo,
    toogleTodo:
    (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({todo, toogleTodo}: Props) => {
  return (
    <div className={ todo.done ? styles.todoDone : styles.todoPending }>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div 
            onClick={ () => toogleTodo(todo.id, !todo.done) }
            className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todo.done ? 'bg-blue-200' : 'bg-red-200'}
            `}>
                {
                    todo.done 
                    ? <IoCheckboxOutline size={30} color="green" />
                    : <IoSquareOutline size={30} />
                }
            </div>
            <div className="text-center sm:text-left">
                <h3 className="font-bold">{todo.description}</h3>
            </div>
        </div>
    </div>
  )
}
