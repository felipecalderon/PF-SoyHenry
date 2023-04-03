import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Tabla = ({datos}) => {
    return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{fontWeight: "bold"}}>ESTADÍSTICAS</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos?.map((dato, index) => {
            return (
              <TableRow className="bg-gray-100">
                <TableCell>{dato.name}</TableCell>
                <TableCell align="center">{dato.cantidad}</TableCell>
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