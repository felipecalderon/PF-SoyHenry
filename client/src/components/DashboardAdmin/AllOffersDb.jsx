import { useEffect, useState } from "react"
import axios from 'axios'
// import useFetch from "../Hooks/useFetch"
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const AllOffersDb = () => {
  // const { data, isLoading } = useFetch(`/jobsdb?page=1`)
  // const [perPage] = useState(9);

  const [data, setData] = useState();
  const [totalPage, setTotalPage] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const currentPage = parseInt(localStorage.getItem('currentPage')); // pagina actual

  useEffect(() => {
    axios.get(`/jobsdb?page=${pageNumber+1}`)
      .then(res => {
        setTotalPage(res.data.total_page)
        setData(res.data.data)
      })
  }, [pageNumber])

  const handlePageClick = (selectedPage) => {
    localStorage.setItem('currentPage', selectedPage.selected); //  Guardado local para que se mantengan la pagina en la que estaba el usuario
    setPageNumber(selectedPage.selected);
  };

  const handleBan = (id, active) => {
    const respuesta = window.confirm(`¿Estás seguro que quieres cambiar el estado de esta oferta?`);
    if (respuesta === true) {
      axios.put(`/jobsld/${id}?active=${!active}`)
        .then(res => {
          !active
            ? alert(`Ya se puede ver la oferta`)
            : alert(`¡Ocultaste la oferta!`)
          window.location.reload()
        }
        )
        .catch(error => {
          alert('Ocurrio un error')
          console.log(error)
        })
    }
  };
  const handleDelete = async (id) => {
    const respuesta = window.confirm(`¿Estás seguro que quieres eliminar esta oferta?. esta Accion es ¡Irreversible!`);
    if (respuesta === true) {
      await axios.delete(`/jobdb/${id}`)
        .then(res => {
          alert(`Eliminaste la oferta laboral de la Base de Datos`)
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
              <TableCell align="center" style={{ fontWeight: "bold" }}>Titulo</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>F. publicación</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>F. cierre</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Aplicaciones</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data?.map(offer => {
                return (
                  <TableRow className="bg-gray-100 text-center">
                    <TableCell align="center">{offer.title.slice(0, 35)}{offer.title.length > 35 ? '...' : ''} </TableCell>
                    <TableCell align="center">{offer.date_post} </TableCell>
                    <TableCell align="center">{offer.expiring_offers} </TableCell>
                    <TableCell align="center">{offer.applications_count} </TableCell>
                    <TableCell align="center">
                      <div className="flex flex-row gap-1 justify-center">
                        <Link to={`/detail/${offer.id}`}>
                          <button className="cursor-pointer">
                            {
                              <Icon component={FindInPageIcon} />
                            }
                          </button>
                        </Link>
                        <button onClick={() => { handleBan(offer.id, offer.active) }} className="cursor-pointer">
                          {
                            offer.active
                              ? <Icon component={VisibilityIcon} style={{ color: '#333333 ' }} />
                              : <Icon component={VisibilityOffIcon} style={{ color: '#333333' }} />
                          }
                        </button>
                        <button onClick={() => { handleDelete(offer.id) }} className="cursor-pointer">
                          <Icon component={DeleteForeverIcon} style={{ color: '#FF0000 ' }} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <div>
          <div className="pb-3">
            <ReactPaginate
              previousLabel={'Prev'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              forcePage={currentPage ? currentPage : 0}
              containerClassName="flex justify-center my-4"
              pageClassName="mx-2 rounded-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              pageLinkClassName="px-4 py-2 text-sm"
              activeClassName="bg-blue-500 text-yellow-500 font-bold"
              previousClassName="mx-2 rounded-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              nextClassName="mx-2 rounded-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              previousLinkClassName="px-4 py-2 font-bold text-sm"
              nextLinkClassName="px-4 py-2 font-bold text-sm"
              breakClassName="mx-2"
            />
          </div>
        </div>
      </TableContainer>
    </>
  )
}

export default AllOffersDb