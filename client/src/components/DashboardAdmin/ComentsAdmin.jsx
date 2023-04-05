import { PersonRemove } from "@mui/icons-material"
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from "axios";
import { useEffect, useState } from "react";

const ComentsAdmin = ({ datos }) => {
  const [allComents, setAllComents] = useState([])
  useEffect(() => {
    axios.get('/review')
      .then(res => {
        setAllComents(res.data)
      })
  }, [])

  const handleDelete = async (id, name) => {
    const respuesta = window.confirm(`¿Estás seguro que quieres eliminar el comentario de ${name}?. esta Accion es ¡Irreversible!`);
    if (respuesta === true) {
      await axios.delete(`/review/${id}`)
        .then(res => {
          alert(`Eliminaste el comentario de de la Base de Datos`)
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
    console.log(state)
    const respuesta = window.confirm(`¿Estás seguro que quieres cambiar el estado de ${name}?`);
    if (respuesta === true) {
      await axios.put(`/review/${id}?active=${!state}`)
        .then(res => {
          state
            ? alert(`¡Ocultaste el comentario de ${name}!`)
            : alert(`Ya se puede ver el comentario de ${name}`)
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
              <TableCell align="center" style={{ fontWeight: "bold" }}>LISTADO DE COMENTARIOS</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Usuario</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Puntuacion</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allComents?.map((dato, index) => {
              return (
                <TableRow className="bg-gray-100 text-center">
                  <TableCell>{dato.comentario}</TableCell>
                  <TableCell align="center">{dato.usuario}</TableCell>
                  <TableCell align="center">{dato.puntuacion}</TableCell>
                  <TableCell align="center">{dato.active ? 'Activo' : 'Oculto'}</TableCell>
                  <TableCell align="center">
                    <div className="flex flex-row gap-1 justify-center">
                      <button onClick={() => { handleBan(dato.id, dato.active, dato.usuario) }} className="cursor-pointer">
                        {
                          dato.active
                            ? <Icon component={VisibilityIcon} style={{color:'#333333 '}} />
                            : <Icon component={VisibilityOffIcon} style={{color:'#333333'}} />
                        }
                      </button>
                      <button onClick={() => { handleDelete(dato.id) }} className="cursor-pointer">
                        <Icon component={PersonRemove} style={{color:'#FF0000'}} />
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

export default ComentsAdmin