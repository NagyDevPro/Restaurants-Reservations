import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; 
import Loader from '../../../layouts/loader/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteRestaurantAsync } from '../../../slices/restaurant/restaurantSlice';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';
import { decryptData } from '../../../helpers/cryptoUtils';

export default function UserRestaurant() {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const userId = decryptData('userId');
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  if (!userData || !userData.restaurants) {
    return (
      <main className="container-fluid restaurant-dashboard">
        <section className="custom-header">
          <h3 className="text-center">Your Restaurants</h3>
          <div className="roof"></div>
        </section>
        <Loader />
      </main>
    );
  }


  const restaurantNames = userData.restaurants.map((restaurant) => restaurant.name);
  const locationCounts = userData.restaurants.map((restaurant) => restaurant.locations.length);

  const chartData = {
    labels: restaurantNames,
    datasets: [{
      label: 'Number of Locations',
      data: locationCounts,
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }]
  };


  // Pagination logic

  const totalItems = userData.restaurants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


    
  const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`my-btn mx-2 ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
   }

  const handleDeleteRestaurant = (restaurantId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this restaurant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
        dispatch(deleteRestaurantAsync(restaurantId))
          .then(() => {
            dispatch(fetchUserDataById(userId)); 
            Swal.fire(
              'Deleted!',
              'The restaurant has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the restaurant.',
              'error'
            );
            setRestaurants(userData.restaurants);
          });
      }
    });
  };





  return (
    <main className="container-fluid restaurant-dashboard">
       
      <section className="custom-header">
        <h3 className="text-center">Your Restaurants</h3>
        <div className="roof"></div>
      </section>

     
      <section className='userdash-restaurant'>

       <NavLink to={`/add-restaurant`} className="my-btn">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          Create Restaurant
        </NavLink>
         
        <div className="pie-chart-container my-4">
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            }}
          />
        </div>

      
        <section className="row row-cols-1 row-cols-md-4 my-4 g-4">

          {currentItems.map((restaurant) => (
            <div className="col my-4" key={restaurant.id}>

              <div className="custom-card h-100">

                <img 
                  src={restaurant.cover} 
                  alt={restaurant.name} 
                  className="card-img-top fixed-size-img" 
                />

                <div className="custom-card-body text-center">

                  <h5 className="card-title my-3">{restaurant.name}</h5>

                  <section className="btn-group">

                    <NavLink 
                     to={`/user-dashboard/restaurant/${restaurant.id}/main`} 
                     className="btn btn-outline-primary  btn-sm">
                      <FontAwesomeIcon icon={faEye} />  Dashboard
                    </NavLink>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteRestaurant(restaurant.id)} 
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </section>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Pagination */}

        <section className="pagination-controls my-4 text-center">

          <button 
           className="my-btn mx-2" 
           onClick={handlePrevPage} 
           disabled={currentPage === 1}>
            Previous
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button 
           className="my-btn mx-2 pe-4 ps-4" 
           onClick={handleNextPage} 
           disabled={currentPage === totalPages}>
            Next
          </button>

        </section>

     
      </section>
    </main>
  );
}