
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin'],
            todos: {
              create: [
                { description: 'Test 1', done: false },
                { description: 'Test 2', done: false },
                { description: 'Test 3', done: false }
              ]
            }
        }
    });
    


  return NextResponse.json({
    message: 'Hello from seed route'
  })
}