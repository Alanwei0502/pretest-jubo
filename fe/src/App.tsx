import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PatientApi } from './apis/patient.api';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OrdersDialog from './components/PatientDialog';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';

function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10, rowsPerPageOptions: [1, 5, 10, 25] });
  const [viewPatient, setViewPatient] = useState<IPatient>();

  const columns: TableCellProps[] = [
    { id: 'name', children: 'Name' },
  ]

  const showPatients = patients.slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage);

  const getPatients = useCallback(
    async () => {
      if (!searchInputRef.current) return;
      const res = await PatientApi.getPatients(searchInputRef.current.value);
      if (res.success) {
        setPatients(res.data ?? []);
      } else {
        console.error(res.error);
      }
    },
    [],
  )

  useEffect(() => {
    getPatients();
  }, [getPatients])

  const handleSearchPatient = () => {
    getPatients();
  }

  const handleClickEditButton = (patient: IPatient) => {
    setViewPatient(patient);
  }

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPagination({ ...pagination, page });
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const rowsPerPage = parseInt(e.target.value);
    setPagination({ ...pagination, rowsPerPage });
  }

  return (
    <Box>
      <Box display='flex' alignItems='flex-start' gap={2}>
        <TextField
          inputRef={searchInputRef}
          size='small'
          sx={{ mb: 2, flexGrow: 1 }}
          placeholder='請輸入住民的姓名'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyDown={e => e.key === 'Enter' && handleSearchPatient()}
        />
        <Button variant='contained' startIcon={<SearchIcon />} onClick={handleSearchPatient}>搜尋</Button>
        {/* <Button variant='outlined' startIcon={<AddIcon />}>新增住民</Button> */}
      </Box>
      <Paper sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(c => <TableCell key={c.id} {...c}>{c.children}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {showPatients.map(p => (
                <TableRow key={p.id} hover sx={{ cursor: 'pointer' }}>
                  <TableCell onClick={() => handleClickEditButton(p)}>{p.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={patients.length}
          page={pagination.page}
          rowsPerPage={pagination.rowsPerPage}
          rowsPerPageOptions={pagination.rowsPerPageOptions}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage='每頁顯示'
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} 共 ${count !== -1 ? count : `超過 ${to}`} 筆`}
        >
        </TablePagination>
      </Paper>
      <OrdersDialog viewPatient={viewPatient} setViewPatient={setViewPatient} getPatients={getPatients} />
    </Box>
  )
}

export default App
