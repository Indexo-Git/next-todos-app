'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    path : string;
    icon : React.ReactNode;
    title : string;
}

export const SidebarItem = ({path, icon, title} : SidebarItemProps) => {

  const pathName = usePathname();

  return (
    <li>
        <Link href={ path } className={`*:
            relative px-4 py-3 flex items-center space-x-4 rounded-xl
            ${pathName === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : 'text-gray-800'}
          `}> 
            { icon }
            <span className="-mr-1 font-medium">{ title }</span>
        </Link>
    </li>
  )
}
