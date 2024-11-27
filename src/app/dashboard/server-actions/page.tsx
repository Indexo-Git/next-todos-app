export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/components/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export default async function ServerTodosPage() {
  
  const user = await getUserSessionServer();

  if(!user) {
    redirect('/api/auth/signin');
  }

  console.log('user', user);

  const todos = await prisma.todo.findMany({
    where : { userId : user.id },
     orderBy: { description : 'asc' } 
    });

  return (
    <div className="py-4" >
      <div className="ml-5 pl-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}