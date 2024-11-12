import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';


export async function GET(request: Request) { 

    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if(isNaN(take)) {
        return NextResponse.json({
            error: 'Invalid take parameter'
        }, { status: 400 });
    }

    if(isNaN(skip)) {
        return NextResponse.json({
            error: 'Invalid skip parameter'
        }, { status: 400 });
    }

    const todos = await prisma.todo.findMany({ take, skip});

  return NextResponse.json({
    todos
  })
}


const postSchema = yup.object({
    description: yup.string().required(),
    done: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 
    try{

        const { description, done } = await postSchema.validate(await request.json());

        const todo = await prisma.todo.create({ data: { description, done } });

        return NextResponse.json({ todo });

    } catch(error : any) {
        return NextResponse.json({
            errorName: error.name,
            errorMessage: error.message
        }, { status: 400 });
    }
}

export async function DELETE() { 
    const todo = await prisma.todo.deleteMany({ where: { done: true } });
    return NextResponse.json({ todo });
}