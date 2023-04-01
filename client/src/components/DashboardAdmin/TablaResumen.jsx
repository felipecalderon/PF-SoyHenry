import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Tabla = () => {
    return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ESTADÍSTICAS</TableCell>
            <TableCell>Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="bg-gray-100">
            <TableCell>Postulantes</TableCell>
            <TableCell>35</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reclutadores</TableCell>
            <TableCell>12</TableCell>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableCell>Ofertas activas</TableCell>
            <TableCell>32</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ofertas por caducar</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableCell>Ofertas caducadas</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}

export default Tabla