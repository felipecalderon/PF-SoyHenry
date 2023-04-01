import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Tabla = ({datos}) => {
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
          {datos?.map((dato, index) => {
            return (
              <TableRow className="bg-gray-100">
                <TableCell>{dato.name}</TableCell>
                <TableCell>{dato.cantidad}</TableCell>
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