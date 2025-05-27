"use client"
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

import { redirect } from "next/navigation";

export function ProtectedRoute({
                                 children,
                               }) {

  let store = useAuthStore()
  useEffect(() => {
    
    if (!store.isAuthenticated) {
      redirect('/auth/login')
    }
    
  }, [ store.isAuthenticated ])
  if (!store.isAuthenticated) {
    return null
  }
  
  return <>{ children }</>
}
