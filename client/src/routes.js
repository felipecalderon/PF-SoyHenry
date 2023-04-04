import { createBrowserRouter } from 'react-router-dom'
import Cards from './components/Cards/Cards'
import { DashboardEmpresa } from './components/DashboardEmpresa/DashboardEmpresa'
import FormCreateOffers from './components/Form/FormCreateOffers'
import JobDetail from './components/JobDetail/JobDetail'
import LandingPage from './components/LandingPage/LandingPage'
import { Registro } from './components/Registro/Registro'
import { RegistroEmpresa } from './components/Registro/RegistroEmpresa'
import { About } from './components/About/About'
import UserProfile from './components/UserProfile/UserProfile'
import Pdf from './components/UserProfile/Pdf'
import NotFound from './components/NotFound/NotFound'
import DashAdmin from './components/DashboardAdmin/DashboardAdmin'
import Terminosdeservicio from './components/Footer/Terminosdeservicio'
export const rutas = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/registro',
      element: <Registro />
    },
    {
      path: '/companyregister',
      element: <RegistroEmpresa />
    },
    {
      path:"*",
      element: <NotFound/>
    },

    // Postulant
    {
      path: '/offers',
      element: <Cards />
    },
    {
      path:'/detail/:id',
      element: <JobDetail />
    },
    {
      path:"/profile",
      element: <UserProfile/>
    },
    {
      path:"/profile/micv",
      element: <Pdf/>
    },

    // Company
    {
      path: '/offersCreate',
      element: <FormCreateOffers />
    },
    {
      path: '/dashboardempresa',
      element: <DashboardEmpresa />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/dashboardadmin',
      element: <DashAdmin />
    },

    {path:"/terminosdeservicio",
    element:<Terminosdeservicio/>

    }
])