import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Cards from './components/Cards/Cards'
import FormCreateOffers from './components/Form/FormCreateOffers'

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
      path: '/offersCreate',
      element: <FormCreateOffers />
    }
])