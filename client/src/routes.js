import { createBrowserRouter } from 'react-router-dom'
import Cards from './components/Cards/Cards'
import { DashboardEmpresa } from './components/DashboardEmpresa/DashboardEmpresa'
import FormCreateOffers from './components/Form/FormCreateOffers'
import JobDetail from './components/JobDetail/JobDetail'
import LandingPage from './components/LandingPage/LandingPage'
import { Registro } from './components/Registro/Registro'
import { RegistroEmpresa } from './components/Registro/RegistroEmpresa'
import { About } from './components/About/About'

export const rutas = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/cards',
      element: <Cards />
    },
    {
      path: '/offersCreate',
      element: <FormCreateOffers />
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
      path:'/detail/:id',
      element: <JobDetail />
    },
    {
      path: '/dashboardempresa',
      element: <DashboardEmpresa />
    },
    {
      path: '/about',
      element: <About />
    }
])