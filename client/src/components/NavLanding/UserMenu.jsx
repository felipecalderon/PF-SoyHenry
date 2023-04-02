import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import {AccountCircle} from '@mui/icons-material'
import Dropdown from "./DropdownUser"
import usuario from "../../assets/user.png"

const UserMenu = ({ user, userGoogle }) => {
    const ref = useRef(null)
    const [showMenu, setShowMenu] = useState(false)

    const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
    const photo =dataUserLocalStorage ? dataUserLocalStorage.photo : null


    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setShowMenu(false);
          }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [ref]);

    if(!user && !userGoogle) return <ProfileButton />
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="flex px-2 w-auto h-10 items-center focus:outline-none dark:bg-secondary-dark bg-primary-light rounded-full"
        >  
        {
          <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer" src={photo || userGoogle?.photo || usuario  } alt="User dropdown" />    
        }
          <span className="text-gray-700 px-1 dark:text-white text-sm font-medium">
            {userGoogle && userGoogle.email ? userGoogle.email : user.email}
          </span>
        </button>
  
        {showMenu && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200">
            { user && <Dropdown rol={user.rol}/> }
            <div className="py-1">
              <Link
                to={"/"}
                onClick={() => localStorage.clear()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  export default UserMenu