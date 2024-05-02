import { default as MuiTable } from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

const HeaderRow = ({ headers }) => (
  <TableHead>
    <TableRow>
      {headers.map((header) => (
        <TableCell align="center">{header}</TableCell>
      ))}
    </TableRow>
  </TableHead>
)
const BodyRows = ({ data }) => {
  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {Object.values(row).map((v: any, i) => (
            <TableCell key={i} align="right">
              {v}
            </TableCell>
          ))}
          <TableCell align="center">
            <Button>edit</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

const Table = ({ headerRow, data }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }}>
        <HeaderRow headers={headerRow} />
        <BodyRows data={data} />
      </MuiTable>
    </TableContainer>
  )
}

export default Table
