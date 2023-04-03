import { useEffect, useState } from "react"
import useFetch from "../Hooks/useFetch"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const AllOffersDb = () => {
    const { data, isLoading } = useFetch('/jobs')
    const [pageNumber, setPageNumber] = useState(0);
    const [perPage] = useState(9);
    useEffect(() => {
        if(data) console.log(data);
    }, [data])
    return (
        <>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Titulo</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Origen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                data?.slice(pageNumber, pageNumber+perPage).map(job => {
                    return (
                        <TableRow className="bg-gray-100 text-center">
                            <TableCell>{job.title.slice(0, 35)}{job.title.length > 35 ? '...' : ''} </TableCell>
                            <TableCell>{job.bd_create ? 'Database' : 'Externo'} </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
        </Table>
      </TableContainer>
        </>
    )
}

export default AllOffersDb