import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { acceptPickUp , markPickedUp, makeVerified, makeRecycled} from '../redux/userSlice';
import { useDispatch } from 'react-redux';


import { Link } from 'react-router-dom'
import moment from 'moment'



export default function StickyHeadTable({orders,button}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows] = useState([]);



const columns = [
  { id: 'orderId', label: 'OrderID', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'Total_Products',
    label: 'Total Products',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'details',
    label: 'View Details',
    minWidth: 20,
    align: 'center'
  },
  button ? {
    id: 'accept',
    label: button,
    minWidth: 20,
    align: 'center'
  } : {},
];

 const dispatch = useDispatch();


  const handleClick = (e,orderId,button) => {
        e.preventDefault();
        if(button === 'Accept') dispatch(acceptPickUp(orderId));
        else if(button === 'MarkPickedUp') dispatch(markPickedUp(orderId));
        else if(button === 'Verify and Recycle') dispatch(makeRecycled(orderId));
        // else if(button === 'Verify') dispatch(makeVerified(orderId));
        // else if(button === 'Recycled') dispatch(makeRecycled(orderId));

  }


  function createData(orderId,date, Total_Products) {
    return {
      orderId,
      date,
      Total_Products,
      details: <Link className='text-black hover:text-blue-500 text-decoration-none' to={`/order/${orderId}`}>Show Full Details</Link>,
      accept: <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => handleClick(e,orderId,button)}>{button}</button>
    };
  }

    useEffect(() => {
        setRows(orders?.map((order) => createData(
            order._id,
            moment(order.createdAt).format('Do MMMM YYYY'),
            order.products.length,
            order.totalPrice
          )));
    },[orders]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns?.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}