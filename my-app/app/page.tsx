import { json } from 'stream/consumers';
import { prisma } from '../src/db'
export default async function Home() {
  
 const user = await prisma.user.findUnique({
  where: { id:2}
 })
 const task = await prisma.task.findFirst({
  where: {id:1}
 })
 

  
  return (
    <div>
      {user?.name}
      {task?.title}
    </div>
  );
}

