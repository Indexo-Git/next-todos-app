'use client';

import { useSession } from "next-auth/react";

export default function ProfilePage() {

    const { data: session } = useSession();

  return (
    <div>
      <h1>Profile Page</h1>
      <hr/>
      <div className="flex flex-col">
        <span className="text-lg">Name: {session?.user?.name}</span>
        <span className="text-lg">Email: {session?.user?.email}</span>
        <span className="text-lg">Image: {session?.user?.image}</span>
    </div>
    </div>
  );
}