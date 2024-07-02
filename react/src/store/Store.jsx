import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import userReducer from '../slices/user/fetchUserSlice';
import restaurantReducer from '../slices/restaurant/restaurantSlice';
import categoryReducer from '../slices/restaurant/category/categorySlice'; 
import menuCategoryReducer from '../slices/restaurant/menuCategory/FetchMenuCategoryById';
import allMenuCategoryReducer from '../slices/restaurant/menuCategory/fetchAllMenuCategory'; 
import menuItemReducer from '../slices/restaurant/menuItem/fetchMenuItemById'; 
import updateMenuItemReducer from '../slices/restaurant/menuItem/updateMenuItem'; 
import menuReducer from '../slices/restaurant/menuItem/addMenuItem';
import menuCategoryUpdateReducer from '../slices/restaurant/menuCategory/updateMenuCategory'; 
import deleteMenuCategoryReducer from '../slices/restaurant/menuCategory/deleteMenuCategorySlice';
import deleteMenuItemReducer from '../slices/restaurant/menuItem/deleteMenuItemSlice';
import locationReducer from '../slices/restaurant/location/locationSlice';
import countriesReducer from '../slices/address/countrySlice';
import governorateReducer from '../slices/address/governorateSlice';
import cityReducer from '../slices/address/citySlice';
import stateReducer from '../slices/address/stateSlice';
import deleteLocationReducer from '../slices/restaurant/location/deleteSlice';
import addTableReducer from '../slices/restaurant/table/addTableSlice';
import updateTableReducer from '../slices/restaurant/table/updateTableSlice';
import deleteTableReducer from '../slices/restaurant/table/deleteTableSlice';
import changePasswordReducer from '../slices/user/changePasswordSlice';
import restaurantCategoryReducer from '../slices/restaurant/restaurantCategory/restaurantCategory';
import availabilityReducer from "../slices/restaurant/table/availabilitySlice";
import fetchTableByIdReducer from "../slices/restaurant/table/getTableSlice";
import tableImageReducer from '../slices/restaurant/tableImage/tableImage';
import userAddressReducer from '../slices/user/userAddressSlice';




const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    restaurant: restaurantReducer,
    category: categoryReducer,
    menuCategory: menuCategoryReducer,
    allMenuCategory: allMenuCategoryReducer,
    menuItem: menuItemReducer,
    updateMenuItem: updateMenuItemReducer,
    menu: menuReducer,
    menuCategoryUpdate: menuCategoryUpdateReducer,
    deleteMenuCategory: deleteMenuCategoryReducer,
    deleteMenuItem: deleteMenuItemReducer,
    location: locationReducer,
    countries: countriesReducer,
    governorate: governorateReducer,
    city: cityReducer,
    state: stateReducer,
    deleteLocation: deleteLocationReducer,
    addTable: addTableReducer,
    fetchTableById: fetchTableByIdReducer,
    updateTable: updateTableReducer,
    deleteTable: deleteTableReducer,
    changePassword: changePasswordReducer,
    restaurantCategory: restaurantCategoryReducer,
    tableImage:tableImageReducer,
    userAddress:userAddressReducer,
   
    tableAvailability: availabilityReducer,
  },
});

export default store;
