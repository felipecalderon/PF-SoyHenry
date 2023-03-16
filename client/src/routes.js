import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Cards from './components/Cards/Cards'
import JobDetail from './components/JobDetail/JobDetail'

export const rutas = createBrowserRouter([
    {
      path: '/',
      element: <App />
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