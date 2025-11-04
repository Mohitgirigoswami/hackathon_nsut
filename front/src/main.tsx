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
import Ongoingdrives from './pages/ongoingdrives';
import LandingPage from './pages/index';
import SignIn from './pages/sign-in/pages';

const router = createBrowserRouter([
  {
    path : "/",
    element : <LandingPage />
  },
  
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
      {
        path:"/ongoing-drives",
        element: <Ongoingdrives />
      }
    ],
  },
 
  {
    path : "*",
    element : <ErrorPage />
  },
  {
    path:"/signIn",
    element: <SignIn />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
)

