
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();
    
    await prisma.todo.createMany({
        data: [
            { description: 'Buy groceries', done: true },
            { description: 'Walk the dog' },
            { description: 'Watch TV' },
        ],
    });

  return NextResponse.json({
    message: 'Hello from seed route'
  })
}