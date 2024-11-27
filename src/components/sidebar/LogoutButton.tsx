'use client';

import { signIn, signOut, useSession } from "next-auth/react"
import { CiLogout, CiTimer, CiUser } from "react-icons/ci"


export const LogoutButton = () => {

const { data: session, status } = useSession();

if (status === 'loading') {
    return (
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiTimer size={25} />
            <span className="group-hover:text-gray-700">Loading</span>
        </button>
      )
}

if (status === 'unauthenticated') {
    return (
        <button 
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiUser size={25} />
            <span className="group-hover:text-gray-700">Login</span>
        </button>
      )
}

  return (
    <button 
        onClick={() => signOut()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout size={25} />
        <span className="group-hover:text-gray-700">Logout</span>
    </button>
  )
}
