import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpecificCategoryAsync, deleteCategoryAsync } from '../../../slices/restaurant/category/categorySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, InputAdornment, TablePagination, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import Loader from '../../../layouts/loader/loader';

const SpecificCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);
  const status = useSelector((state) => state.category.status);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchSpecificCategoryAsync());
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryAsync(categoryId))
          .then(() => {
            dispatch(fetchSpecificCategoryAsync());
            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting category:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the category.',
              'error'
            );
          });
      }
    });
  };

  const filteredCategories = Array.isArray(categories) ? categories.filter(category => category.status !== 'deleted') : [];

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <main className="container-fluid restaurant-dashboards mx-5">

      <section className="custom-header">
        <h3 className="text-center">Specific Categories</h3>
        <div className="roof"></div>
      </section>

      <Paper sx={{ width: '100%', marginTop: '10px' }}>

        <div className="float-end my-4" style={{ zIndex: 10, position: 'relative' }}>
          <Link  to={`/add-special-category`} className="btn btn-outline-warning mx-2 text-dark">
            <FontAwesomeIcon icon={faPlus} /> Add
          </Link>
        </div>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className='my-3'
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>
          
          <Table aria-label="sticky table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="text-center table-cell">Name</TableCell>
                <TableCell className="text-center table-cell">Description</TableCell>
                <TableCell className="text-center table-cell">Status</TableCell>
                <TableCell className="text-center table-cell">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((item) => (
                  <TableRow key={item.id} hover={true}>
                    <TableCell className="text-center">{item.name}</TableCell>
                    <TableCell className="text-center">{item.description}</TableCell>
                    <TableCell className="text-center">{item.status}</TableCell>
                    <TableCell className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/edit-category/${item.id}`}
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteCategory(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredCategories.length}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </main>
  );
};

export default SpecificCategories;
