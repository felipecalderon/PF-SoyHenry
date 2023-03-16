import { createBrowserRouter } from 'react-router-dom'
import Cards from './components/Cards/Cards'
import JobDetail from './components/JobDetail/JobDetail'
import LandingPage from './components/LandingPage/LandingPage'

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
      path:'/detail',
      element: <JobDetail />
    }
])