import Image from "next/image"
import Link from "next/link"
import { CiBookmark, CiHome } from "react-icons/ci"
import { LogoutButton, SidebarItem } from '..';
import { IoBasketOutline, IoCode, IoPersonOutline } from "react-icons/io5";
import { auth } from "../../../auth";

interface menuItem  {
    path: string;
    icon: JSX.Element;
    title: string;
}

const menu: menuItem[] = [
    {
        path: "/dashboard",
        icon: <CiHome size={30} />,
        title: "Dashboard"
    },
    {
        path: "/dashboard/rest-todos",
        icon: <CiBookmark size={30} />,
        title: "REST Todos"
    },
    {
        path: "/dashboard/server-actions",
        icon: <CiBookmark size={30} />,
        title: "Server Actions"
    },
    {
        path: "/dashboard/cookies",
        icon: <IoCode size={30} />,
        title: "Cookies"
    },
    {
        path: "/dashboard/products",
        icon: <IoBasketOutline size={30} />,
        title: "Products"
    },
    {
        path: "/dashboard/profile",
        icon: <IoPersonOutline size={30} />,
        title: "Profile"
    }

]

export const Sidebar = async () => {

    const session = await auth();

    const userName = session?.user?.name ?? 'User';
    const userEmail = session?.user?.email ?? 'user@email.com';
    const userImage = session?.user?.image ?? 'https://chuchovergara.com/svg/logo.svg';


  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
            <div className="-mx-6 px-6 py-4">
                <Link href="/dashboard">
                    <Image src="https://chuchovergara.com/svg/logo.svg" width={100} height={100} className="w-10" alt="tailus logo"/>
                </Link>
            </div>

            <div className="mt-8 text-center">
                <Image src={ userImage } width={100} height={100} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
                <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ userName }</h5>
                <h6 className="hidden text-gray-500 lg:block">{ userEmail }</h6>
                <span className="hidden text-gray-400 lg:block">Admin</span>
            </div>

            <ul className="space-y-2 tracking-wide mt-8">
                {/* TODO: src/components <SidebarItem /> */}
                {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
                {
                    menu.map((item: menuItem, index: any) => (
                        <SidebarItem key={index} {... item } />
                    ))
                }
            </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
            <LogoutButton />
        </div>
    </aside>
  )
}
