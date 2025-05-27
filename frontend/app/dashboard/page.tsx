"use client"
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";
//TODO fix issue with protected route so redirects to come from only 1 component if there is no access token and user is not authenticated
export default function Dashboard() {
  const store = useAuthStore();
  
  useEffect(() => {
  if (!store.isAuthenticated)  {
    redirect('/auth/login')
    
  }
  }, [store.isAuthenticated])
  
  return <div>dashboard</div>
}
