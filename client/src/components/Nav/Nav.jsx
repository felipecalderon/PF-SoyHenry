import React from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
import { rutas } from '../../routes'
import style from './Nav.module.css'

export const Nav = () => {

    return (
        <nav className={style.nav}>
            <div>
                <img src={logofusionajob} alt='logo'/>
            </div>
            <div>
                <Link><button className={style.botonInicio}>Inicio</button></Link>
            </div>
            <div className={style.botonEmpleadores}>
                <Link><button>Empleadores</button></Link>
            </div>
            <div className={style.botonTrabajos}>
                <Link>
                    <select name='Trabajos'>
                        <option value='value1'>Trabajos</option>
                        <option value='value2'>Value 2</option>
                        <option value='value3'>Value 3</option>
                    </select>
                </Link>
            </div>
            <div className={style.botonPlanes}>
                <Link><button>Planes/Tarifas</button></Link>
            </div>
            <div className={style.botonRegistro}>
                <Link><button>Registro</button></Link>
            </div>
            <div  className={style.botonIngreso}>
                <Link><button>Ingreso</button></Link>
            </div>
            <div> // Boton dark mode
                <label className={style.switch}>
                    <input type="checkbox"/>
                    <span className={style.slider}/>
                </label>
            </div>
        </nav>
    )
}