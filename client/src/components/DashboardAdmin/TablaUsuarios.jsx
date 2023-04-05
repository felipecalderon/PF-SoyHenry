import { PersonRemove } from "@mui/icons-material"
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import PersonOffIcon from '@mui/icons-material/PersonOff';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from "axios";

const Tabla = ({ datos }) => {
  const handlePremium = async (id, premium, name) => {
    const respuesta = window.confirm(`¿Estás seguro quieres cambiar el plan de ${name}?`);
    if (respuesta === true) {
      await axios.put(`/update/${id}?state=${!premium}`)
        .then(res => {
          !premium
            ? alert(`Ahora ${name} es ¡Premium!`)
            : alert(`Ahora ${name} ya ¡No es Premium!`)
          window.location.reload()
        }
        )
        .catch(error => {
          alert('Ocurrio un error')
          console.log(error)
        })
    }
  };
  const handleBan = async (id, state, name) => {
    const respuesta = window.confirm(`¿Estás seguro que quieres cambiar el estado de ${name}?`);
    if (respuesta === true) {
      await axios.put(`/update/${id}?active=${!state}`)
        .then(res => {
          state
            ? alert(`¡Baneaste! a ${name}`)
            : alert(`Le quitaste el Ban a ${name}`)
          window.location.reload()
        }
        )
        .catch(error => {
          alert('Ocurrio un error')
          console.log(error)
        })
    }
  };
  const handleDelete = async (id, name) => {
    const respuesta = window.confirm(`¿Estás seguro que quieres eliminar los datos de ${name}?. esta Accion es ¡Irreversible!`);
    if (respuesta === true) {
      await axios.delete(`/user/${id}`)
        .then(res => {
          alert(`Eliminaste a ${name} de la Base de Datos`)
          window.location.reload()
        }
        )
        .catch(error => {
          alert('Ocurrio un error')
          console.log(error)
        })
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>LISTADO DE POSTULANTES</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Usuario desde</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos?.map((dato, index) => {
              return (
                <TableRow className="bg-gray-100 text-center">
                  <TableCell>{dato.name}</TableCell>
                  <TableCell align="center">{dato.rol === "Empresa" ? "Recruiter" : dato.rol}</TableCell>
                  <TableCell align="center">{dato.fecha_registro}</TableCell>
                  <TableCell align="center">{dato.activo ? 'Activo' : 'Desactivado'}</TableCell>
                  <TableCell align="center">
                    <div className="flex flex-row gap-1 justify-center">
                      <button onClick={() => { handlePremium(dato.id, dato.premium, dato.name) }} className="cursor-pointer">
                        {
                          dato.rol !== 'Empresa' && dato.rol !== 'Admin' ?
                            dato.premium
                              ? <Icon component={StarIcon} style={{color:'#FFD700 '}} />
                              : <Icon component={StarBorderIcon} style={{color:'#FFD700'}}/>
                            : null
                        }
                      </button>
                      <button onClick={() => { handleBan(dato.id, dato.activo, dato.name) }} className="cursor-pointer">
                        {
                          dato.rol !== 'Admin' ?
                            dato.activo
                              ? <Icon component={PersonOffIcon} style={{color:'#333333 '}} />
                              : <Icon component={HowToRegIcon} style={{color:'#333333 '}} />
                            : null
                        }
                      </button>
                      <button onClick={() => { handleDelete(dato.id, dato.name) }} className="cursor-pointer">
                        <Icon component={PersonRemove} style={{color:'#FF0000 '}} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Tabla