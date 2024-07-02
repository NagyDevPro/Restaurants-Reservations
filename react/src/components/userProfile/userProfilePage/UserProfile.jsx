import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faKey, faLock, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BodyColorContext } from '../../../BodyColorContext';
import Loader from '../../../layouts/loader/loader';
import { deleteRestaurantAsync } from '../../../slices/restaurant/restaurantSlice';
import './userProfile.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUserAddressAsync } from '../../../slices/user/userAddressSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);
  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);
  const { bodyColor } = useContext(BodyColorContext);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userData && userData.restaurants) {
      setRestaurants(userData.restaurants);
    }
  }, [userData]);

  const handleDeleteAddress = (addressId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this address!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAddressAsync({ userId, addressId }))
          .then(() => {
            const updatedAddresses = userData.addresses.filter(address => address.id !== addressId);
            dispatch(fetchUserDataById(userId)); 
            Swal.fire(
              'Deleted!',
              'The address has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the address.',
              'error'
            );
          });
      }
    });
  };

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

  if (userDataStatus === 'loading') {
    return <Loader />;
  }

  if (userDataStatus === 'failed') {
    return <div>Error: {userDataError}</div>;
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <main className="userProfile">
        <section className="row position-relative">
          <div className="col-12 restaurant-cover">

            <img
              style={{ height: '80vh' }}
              className="w-100"
              src={bodyColor === 'light' ? "/images/1 (1).jpg" : "/images/banner_top_all.png"}
              alt="Cover"
            />

            <div className="restaurant-overlay">
              <header className='restaurant-header'>
                <h1 className='display-4'>Every Restaurant Has Story</h1>
              </header>
            </div>

          </div>

          <div className="col-2 position-absolute bottom-0 start-0 z-2">
            <img
              src={userData.profile_image_url}
              alt="Profile"
              className="rounded-circle"
            />
          </div>
        </section>

        <section className="row my-5">
          <aside className="col-8 my-5">
            <section className="my-5">
              <h2 className='my-5'>Personal Information</h2>
              <section className='info'>

                <div className="icon-wrapper">
                  <Link to={`/change-password/${userId}`} className="text-warning text-decoration-none">
                    <FontAwesomeIcon icon={faLock} className="text-warning" />
                    <span>Change Password</span>
                  </Link>
                </div>

                <div className="icon-wrapper">
                  <Link to={`/edit-profile/${userId}`} className="text-warning text-decoration-none">
                    <FontAwesomeIcon icon={faEdit} className=" text-warning" />
                    <span>Edit Profile</span>
                  </Link>
                </div>

              </section>

              <section className='info'>
                
                <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'} my-3`}>
                  <strong>Name:</strong> {userData.first_name} {userData.last_name}
                </p>

                <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                  <strong>Email:</strong> {userData.email}
                </p>

                <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                  <strong>Mobile Number:</strong> {userData.mobile_number || 'N/A'}
                </p>

              </section>
            </section>

            <section>
              <h2>Address Information
                <span>
                  <Link to={`/add-address`}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-warning mx-5" />
                  </Link>
                </span>
              </h2>
              {userData.addresses && userData.addresses.length > 0 ? (
                userData.addresses.map((address) => (
                  <div key={address.id} className="info my-5">
                    <Link to={`/edit-address/${address.id}`} className="text-warning text-decoration-none">
                      <FontAwesomeIcon icon={faEdit} className=" text-warning" />
                    </Link>
                    <span onClick={() => handleDeleteAddress(address.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-warning mx-3"
                      />
                    </span>
                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>Address:</strong> {address.address}
                    </p>
                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>Country:</strong> {address.country}
                    </p>
                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>Governorate:</strong> {address.governorate}
                    </p>
                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>City:</strong> {address.city}
                    </p>
                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>State:</strong> {address.state}
                    </p>
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
            </section>

            {role === 'owner' && (
              <section>
                <h2>
                  Restaurants
                  <span>
                    <Link to={`/user-dashboard/add-restaurant/${userId}`}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-warning mx-5" />
                    </Link>
                  </span>
                </h2>
                {restaurants && restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="info my-5 restaurant-info">
                      <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'} my-4`}>
                        <strong>Name:</strong> {restaurant.name}
                        <Link to={`/user-dashboard/restaurant/${restaurant.id}`} className='ms-3 h5'>
                          <FontAwesomeIcon icon={faEye} className="text-warning" />
                        </Link>
                        <span onClick={() => handleDeleteRestaurant(restaurant.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-warning mx-5"
                          />
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No restaurants found</p>
                )}
              </section>
            )}
          </aside>
          <aside className="col-4 aside-data">
            <div className="my-image-container side-image">
              <img
                src="/images/1 (4).jpg"
                alt="side image"
                className="side-image"
              />

              <div className="image-overlay">
               
              </div>

              
            </div>

            <section className='caption'>
              <p className='text-center my-5'>
                Explore a world of flavors and stories at our restaurants. 
              </p>

              <p className='  text-center my-5'>
               Let's create unforgettable dining experiences together!
              </p>

              </section>
          </aside>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
