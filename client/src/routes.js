import { createBrowserRouter } from 'react-router-dom'
import App from './App'

export const rutas = createBrowserRouter([
    {
      path: '/',
      element: <App />
    },
    {
      path: '/about',
      element: <h3>Soy el about</h3>
    }
])