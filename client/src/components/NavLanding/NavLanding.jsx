import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
import perfil from '../../assets/user.png'
import ModoNoche from "./ModoNoche";
import ProfileButton from "./ProfileButton";

export const NavLanding = ({menu}) => {
    return (
    <nav className="bg-secondary-light dark:bg-primary-dark fixed top-0 w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-10 w-auto"
              src={logofusionajob}
              alt="Workflow"
            />
          </div>
          {/* Menú */}
          <div className="block">
            <div className="ml-6 flex items-baseline space-x-4 dark:text-text-dark text-gray-900">
            {
              menu?.map(item => {
                return <Link key={item.name} to={item.link} className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">{ item.name }</Link>
              })
            }
            </div>
          </div>
          {/* Botones */}
          <div className="block">
            <div className="ml-4 flex items-center md:ml-6 gap-3">
            <ProfileButton perfil={perfil} />
            <ModoNoche />
            </div>
          </div>
        </div>
      </div>
            
    </nav>
)
}