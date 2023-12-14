import { useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import SideBar from '../components/dashboard/SideBar';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchHistory, returnBooks } from '../store/actions/lending.actions';
import { formatDate } from '../utils/formatDate';

const LoansPage = () => {
  const { myLoans } = useAppSelector((state) => state.lending);

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleReturn = (bookId: string) => {
    try {
      dispatch(returnBooks([bookId]));
      enqueueSnackbar('Returned book successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'cover',
      headerName: 'Cover',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <img
          src={params.row.book.img}
          alt={params.row.book.title}
          style={{ width: '50px', height: 'auto' }}
        />
      ),
    },
    {
      field: 'title',
      headerName: 'Book',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.book.title || ''}`,
    },
    {
      field: 'borrowed_Date',
      headerName: 'Borrowed Date',
      width: 140,
      valueGetter: (params: GridValueGetterParams) =>
        formatDate(params.row.borrowed_Date),
    },
    {
      field: 'returned_Date',
      headerName: 'Returned Date',
      width: 140,
      valueGetter: (params: GridValueGetterParams) =>
        formatDate(params.row.returned_Date),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      valueGetter: (params) => {
        return params.row.returned_Date ? 'Returned' : 'Not Returned';
      },
      renderCell: (params) => {
        const isReturnedDateEmpty = !params.row.returned_Date;

        return isReturnedDateEmpty ? (
          <Button
            variant="contained"
            onClick={() => handleReturn(params.row.book._id)}
          >
            Return
          </Button>
        ) : null;
      },
    },
  ];

  return (
    <Container sx={{ paddingTop: { xs: '1rem', md: '4rem' } }}>
      <Grid container spacing={2}>
        <SideBar />
        <Grid item xs={12} md={9}>
          <Typography variant="h5" marginBottom={2}>
            Loans
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ padding: 2 }}>
                <DataGrid
                  rows={myLoans.map((loan) => ({ ...loan, isSelected: false }))}
                  columns={columns}
                  rowHeight={100}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'returned_Date', sort: 'asc' }],
                    },
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  isRowSelectable={(params) => {
                    return !params.row.book.title;
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoansPage;
