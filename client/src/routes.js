import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Cards from './components/Cards/Cards'
// import LandingPage from './components/LandingPage/LandingPage'

export const rutas = createBrowserRouter([
    {
      path: '/',
      element: <App />
    },
    {
      path: '/cards',
      element: <Cards />
    },
 
])