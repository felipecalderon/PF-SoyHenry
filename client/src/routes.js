import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Cards from './components/Cards/Cards'

export const rutas = createBrowserRouter([
    {
      path: '/',
      element: <App />
    },
    {
      path: '/cards',
      element: <Cards />
    }
])