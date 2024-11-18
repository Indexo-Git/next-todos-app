import { TabBar } from "@/components";
import { cookies } from 'next/headers'

export const metadata = {
    title : 'Cookies Page',
    description : 'Cookies Page Description'
}


export default async function CookiesPage() {
  const cookieStore = await cookies();
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
            <span className="text-2xl">Tabs</span>
            <TabBar currentTab={ +cookieTab } />
        </div>
    </div>
  );
}