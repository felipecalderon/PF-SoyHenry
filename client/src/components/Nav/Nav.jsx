import React from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
import style from './Nav.module.css'

export const Nav = () => {

    return (
        <nav className={style.nav}>
            <div className={style.container}>
                <img src={logofusionajob} alt='logo'/>
                <div className={style.buttons}>
                    <Link><button className={style.botonInicio}>Inicio</button></Link>
                    <Link><button className={style.botonEmpleadores}>Empleadores</button></Link>
                    <div className={style.botonTrabajos}>
                    <Link>
                        <select name='Trabajos'>
                            <option value='trabajos'>Trabajos ▼</option>
                            <option value='remoto'>Remoto</option>
                            <option value='presencial'>Presencial</option>
                            <option value='hibrido'>Híbrido</option>
                        </select>
                    </Link>
                    </div>
                    <Link><button className={style.botonPlanes}>Planes/Tarifas</button></Link>
                    <Link><button className={style.botonRegistro}>Registro</button></Link>
                    <Link><button className={style.botonIngreso}>Ingreso</button></Link>
                    <div> {/*Boton dark mode*/}
                        <label className={style.switch}>
                             <input type="checkbox"/>
                            <span className={style.slider}/>
                        </label>
                    </div>
                </div>
            </div>
        </nav>
    )
}