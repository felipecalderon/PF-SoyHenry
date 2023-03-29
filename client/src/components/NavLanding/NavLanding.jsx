import { Link, useNavigate } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
import ModoNoche from "./ModoNoche";
import UserMenu from "./UserMenu";

export const NavLanding = ({menu}) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userLogin'))
  const userGoogle = JSON.parse(localStorage.getItem('usergoogle'))
    return (
      <nav className="z-50 bg-secondary-light dark:bg-primary-dark fixed top-0 w-full transition-all">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo y Menú */}
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-16 w-auto cursor-pointer"
            src={logofusionajob}
            alt="Fusiona Job"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="ml-6 flex items-baseline space-x-4 dark:text-text-dark text-gray-900">
        {
          menu?.map(item => {
            return <Link key={item.name} to={item.link} className="dark:hover:text-yellow-200 hover:scale-110 transition-all inline-block font-medium px-4 py-2">{ item.name }</Link>
          })
        }
        </div>
      </div>
      {/* Botones */}
      <div className="flex-grow">
        <div className="ml-4 flex items-center justify-end md:ml-6 gap-3">
        <UserMenu user={user} userGoogle={userGoogle}/>
        <ModoNoche />
        </div>
      </div>
    </div>
  </div>
</nav>
)
}