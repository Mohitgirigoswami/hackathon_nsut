import React from 'react'
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session } = authClient.useSession()
  return (
    <>
      <div>username: {session?.user?.name}</div>
      <div>email: {session?.user?.email}</div>
    </>
  )

}