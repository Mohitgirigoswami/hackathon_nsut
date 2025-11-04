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
import Dashboard from './pages/dashboard';
<<<<<<< Updated upstream
import SignUp from './pages/sign-up/pages';
=======
import Villages from './pages/villages';
import Drives from './pages/drives';
import Beneficiaries from './pages/beneficiaries';
import Vaccines from './pages/vaccines';
>>>>>>> Stashed changes

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/add-drive",
        element: <DriveForm />
      },
      {
        path: "/add-village",
        element: <VillageForm />
      },
       {
         path: "/ongoing-drives",
         element: <Ongoingdrives />
       },
       {
         path: "/villages",
         element: <Villages />
       },
       {
         path: "/drives",
         element: <Drives />
       },
       {
         path: "/beneficiaries",
         element: <Beneficiaries />
       },
       {
         path: "/vaccines",
         element: <Vaccines />
       }
    ],
  },

  {
    path: "*",
    element: <ErrorPage />
  },
  {
    path: "/signIn",
    element: <SignIn />
  },
  {
    path:"/signUp",
    element: <SignUp />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
)

