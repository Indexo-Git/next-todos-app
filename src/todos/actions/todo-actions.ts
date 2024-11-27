'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, done: boolean): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
        throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { done }
    });

    revalidatePath('/dashboard/server-actions');

    return updatedTodo;

}

export const addTodo = async (description: string, userId: string): Promise<Todo> => {
    try{

        const todo = await prisma.todo.create({ data: { description, userId  } });

        revalidatePath('/dashboard/server-actions');

        return todo;
    }
    catch(error: any) {
        throw new Error(error.message);
    }
}

export const deleteCompleted = async ():Promise<void> => {
     await prisma.todo.deleteMany({ where: { done: true } });

    revalidatePath('/dashboard/server-actions');

}