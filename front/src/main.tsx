import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './pages/layout'
import { SidebarProvider } from "@/components/ui/sidebar"
import DriveForm from './pages/driveform';
import VillageForm from './pages/villageform';
import ErrorPage from './pages/error404';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
     
      {
        path: "/add-drive",
        element: <DriveForm />
      },
      {
        path: "/add-village",
        element: <VillageForm />
      },
     
    ],
  },
 
  {
    path : "*",
    element : <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
)

