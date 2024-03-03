import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@emotion/react';
import { Box, TableSortLabel, Tooltip } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
  let aValue = a[orderBy];
  let bValue = b[orderBy];

  if (typeof aValue === 'object') {
    aValue = a[`${orderBy}Text`];
    bValue = b[`${orderBy}Text`];
  }
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.align ? headCell.align : "center"}
            style={{ minWidth: headCell.minWidth }}
            sx={{
              padding: "7px",
              color: "white",
              backgroundColor: "#cb2d3e",
              border: "1px solid rgba(224, 224, 224, 1)",
              '& .Mui-active': {
                color: "white !important",
              },
              ...(headCell.headerStyles ? headCell.headerStyles : {})
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '& .MuiTableSortLabel-icon': {
                  color: "white !important"
                },
                '&:hover': {
                  color: "white !important"
                }
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


export default function ReactTable(props) {
  const rows = props.data;
  const columns = props.columns;

  const [tableData, setTableData] = React.useState(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const visibleRows = React.useMemo(
    () =>
      stableSort(tableData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, tableData],
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    setTableData(props.data);
  }, [props.data])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (searchValue) => {
    if (!searchValue || searchValue.trim() === "") {
      setTableData(rows);
    }
    else {
      const caseValue = searchValue.toLowerCase();
      const filteredData = [];
      rows.forEach((obj) => {
        for (let key in obj) {
          if (typeof obj[key] === "string") {
            if (obj[key].toLowerCase().includes(caseValue)) {
              filteredData.push(obj);
              break;
            }
          }
          else {
            if (
              obj[key] &&
              obj[key].props &&
              typeof obj[key].props.children === "string" &&
              obj[key].props.children.toLowerCase().includes(caseValue)
            ) {
              filteredData.push(obj);
              break;
            }
            else if (
              obj[key] &&
              obj[key].props &&
              typeof obj[key].props.children === "object" &&
              typeof obj[key].props.children[0] === "string" &&
              obj[key].props.children[0].toLowerCase().includes(caseValue)
            ) {
              filteredData.push(obj);
              break;
            }
          }

        }
      });
      console.log("filteredData", filteredData)
      setTableData(filteredData);
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <input
        placeholder='Search...'
        onChange={(event) => handleSearch(event.target.value)}
        style={{
          padding: "8px",
          margin: "10px"
        }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
            columns={columns}
          />
          {/* <TableHead>
            <TableRow
            >
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align ? column.align : "center"}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    padding: "7px",
                    color: "white",
                    backgroundColor: "#cb2d3e",
                    border: "1px solid rgba(224, 224, 224, 1)",
                    ...(column.headerStyles ? column.headerStyles : {})
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}
          <TableBody>
            {visibleRows
              .map((row, index1) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index1}>
                    {columns.map((column, index2) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={index2}
                          align={column.cellAlign ? column.cellAlign : "left"}
                          sx={{
                            padding: "5px",
                            border: "1px solid rgba(224, 224, 224, 1)",
                            ...(column.cellStyles ? column.cellStyles : {})
                          }}
                        >
                          {column.showTooltip ? (
                            <Tooltip title={value}>
                              {value}
                            </Tooltip>
                          ) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {
              tableData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{
                      textAlign: "center",
                      height: "18rem",
                    }}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        sx={{
          borderTop: "1px solid rgba(224, 224, 224, 1)",
        }}
      />
    </Paper>
  );
}
