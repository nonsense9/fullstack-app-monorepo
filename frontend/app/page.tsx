import Navigation from "@/components/Navigation";
import Dashboard from "@/app/dashboard/page";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Home() {
  return (<>
    <ProtectedRoute>
      <Navigation/>
      <Dashboard/>
    </ProtectedRoute>
  </>)
  
}
