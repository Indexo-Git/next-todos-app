import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: {
        id: string
    }
}

const getTodo = async (id: string): Promise<Todo | null> => {
    return await prisma.todo.findFirst({ where: { id } });
}


export async function GET(request: Request, { params }: Segments) {

    const { id } = await params;

    const todo = await getTodo(id);

    if(!todo) {
        return NextResponse.json({
            error: 'Todo not found'
        }, { status: 404 });
    }

    return NextResponse
    .json({
        todo
    })
}

const putSchema = yup.object({
    description: yup.string().optional(),
    done: yup.boolean().optional(),
})


export async function PUT(request: Request, { params }: Segments) {
    const { id } = await params;

    const todo = await getTodo(id);

    if(!todo) {
        return NextResponse.json({
            error: 'Todo not found'
        }, { status: 404 });
    }

    try{

        const { description, done } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                description,
                done
            }
        });
    
    
        return NextResponse.json({
            todo: updatedTodo
        });

    } catch(error : any) {
        return NextResponse.json({
            errorName: error.name,
            errorMessage: error.message
        }, { status: 400 });
    }
}