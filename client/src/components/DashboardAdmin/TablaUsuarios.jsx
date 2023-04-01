import { BorderColor, PersonRemove } from "@mui/icons-material"
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Tabla = ({datos}) => {
    return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>LISTADO DE POSTULANTES</TableCell>
            <TableCell>Postulaciones realizadas</TableCell>
            <TableCell>Usuario desde</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos?.map((dato, index) => {
            return (
              <TableRow className="bg-gray-100 text-center">
                <TableCell>{dato.name}</TableCell>
                <TableCell>{dato.postulaciones_realizadas}</TableCell>
                <TableCell>{dato.fecha_registro}</TableCell>
                <TableCell>{dato.activo ? 'Activo' : 'Desactivado'}</TableCell>
                <TableCell>
                    <div className="flex flex-row gap-1">
                    <Icon component={BorderColor} />
                    <Icon component={PersonRemove} />
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