import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { WidgetItem } from "../../components";

export default async function DashboardPage() {


  const session = await auth();

  if(!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    
        {/* TODO: src/components <WidgetItem /> */}



        <WidgetItem title="Connected User S-Side">
          <div className="flex flex-col">
          {
            JSON.stringify(session)
          }
          </div>
      
        </WidgetItem>
      
    </div>
  );
}