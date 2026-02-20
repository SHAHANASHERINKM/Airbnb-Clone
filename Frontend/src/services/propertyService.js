import axios from "axios"
import { data } from "react-router-dom";

import api from "./Api";

export const getProperties = async (filters) => {
    const API_URL = import.meta.env.VITE_BASE_URL + "users/search-properties"

    const response = await axios.get(API_URL, {
        params: filters,
    });
    console.log("response form backedn",response.data.properties)
    return response.data;
}
export const getSingleProperty = async (id) => {
    const API_URL = import.meta.env.VITE_BASE_URL + `users/property/${id}`
    const response = await axios.get(API_URL);
    console.log("response",response.data);
    return response.data;

}
export const checkAvailability = async (data) => {
    const API_URL = import.meta.env.VITE_BASE_URL + "bookings/check-availabilty"
    try {
        const response = await axios.post(API_URL, data);
        return response.data
    }
    catch (error) {
        console.error("check availability error:", error);
        console.log("Backend message:", error.response?.data?.message);

        throw error;
    }

}
export const createBooking = async (data) => {
    const API_URL = "bookings/booking";
    try {
        const response = await api.post(API_URL, data
        );
        return response.data;

    }
    catch (error) {
        console.error("Booking error:", error);
        console.log("Backend error:", error.response?.data?.message);
        throw error;

    }
}

export const getSingleBooking = async (id) => {
    const API_URL = `bookings/booking/${id}`
    try {
        const response = await api.get(API_URL );

        return response.data;

    }
    catch (error) {
        throw error;

    }
}

export const getCancellationPolicy = async () => {

    const API_URL = "bookings/cancellation-policy";
    try {
        const response = await api.get(API_URL);
        // console.log("res policy",response)
        return response.data;

    }
    catch (error) {
        throw error;

    }


}
export const paymentApi = async (bookingId) => {
    // const API_URL=import.meta.env.VITE_BASE_URL+`bookings/booking/${bookingId}`; 
    try {
        const response = await api.patch(`bookings/${bookingId}/pay`)
        return response.data;

    }
    catch (error) {
        throw error;
    }
}



export const toggleWishlist = async (propertyId) => {
    const API_URL = `users/${propertyId}/wishlist`
    try {
        const response = await api.post(API_URL);
        return response.data;
    }
    catch (error) {
        throw error;

    }
}


export const getWishlist = async () => {
    const API_URL = "users/wishlist";
    try {
        const res = await api.get(API_URL);
        // console.log("res",res)
        return res.data.wishlistItems?.map(item => item.property) || [];

    }
    catch (error) {
        throw error;

    }

}

export const getMyBookings = async () => {
    try {
        const res = await api.get("users/my-bookings");
        console.log("Booking from servive", res.data)
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

export const cancelBooking = async (bookingId) => {
    try {
        const res = await api.patch(`bookings/${bookingId}/cancel-booking`);
        return res.data;
    }
    catch (error) {
        throw error;

    }
}

export const fetchHostBookings = async (recent = false) => {
    try {
        const res = await api.get(`host/AllBookings?recent=${recent}`);
        console.log("host bookings", res)
        return res.data;

    }
    catch (error) {
        throw error;

    }
}

export const fetchHostProperties = async () => {
    try {
        const res = await api.get("host/properties");
        console.log(res.data)

        return res.data;

    }
    catch (error) {
        throw error;


    }
}

export const deleteProperty = async (propertyId) => {

    try {
        const res = await api.delete(`host/property/${propertyId}`);
        console.log("res:", res.data);
        return res.data;

    }
    catch (error) {
        throw error;
    }
}

export const addProperty = async (data) => {
    try {
        const res = await api.post("host/property", data);
        // console.log("res from add proerty",res)
        return res.data;
    }
    catch (error) {
        throw error;

    }
}

export const updateProperty = async (propertyId, data) => {
    try {
        const res = await api.patch(`/host/property/${propertyId}`, data);
        return res.data;

    }
    catch (error) {
        throw error;
    }
}

export const fetchRecentHostReq=async ()=>{
    try{
        const res = await api.get(`admin/users?role=user&hostStatus=pending&recent=true`);
console.log(res.data);
return res.data;

    }
    catch(error){
        throw error;

    }
}


export const fetchRecentPropertyReq=async()=>{
    try{
        const res=await api.get(`admin/properties?status=pending&recent=true`);
        console.log(res.data);
        return res.data;

    }
    catch(error){
        throw error;
    }
}

export const fetchDashboardCounts=async()=>{
    try{
        const res=await api.get("admin/counts");
        console.log(res.data);
        return res.data;
    }
    catch(error){
        throw error;
    }
}

export const fetchPropertiesAdmin=async()=>{
    try{
        const res=await api.get("admin/properties");
        return res.data;

    }
    catch(error){
        throw error;
    }
}

export const approveProperty=async(propertyId)=>{
    try{
        const res=await api.patch(`admin/property/${propertyId}/approve`);
        return res.data;

    }
    catch(error){
throw error;
    }
}

export const rejectProperty=async(propertyId)=>{
    try{
        const res=await api.patch(`admin/property/${propertyId}/reject`);
        return res.data;

    }
    catch(error){
        throw error;
    }
}

export const fetchApprovalPropertiesAdmin=async()=>{
    try{
        const res= await api.get("admin/properties?status=pending");
        return res.data;

    }
    catch(error){
        throw error;
    }
}

export const fetchAllBookingsAdmin=async()=>{
    try{
        const res=await api.get("admin/bookings");
        console.log("rs",res.data)
        return res.data;

    }
    catch(error){
        throw error;
    }
}

export const fetchPropertyReview=async(propertyId)=>{
    try{
        const res=await api.get(`users/review/${propertyId}`);
        console.log("review",res.data)
        return res.data;

    }
    catch(error){
        throw error;

    }
}

export const addPropertyReview=async(data)=>{
    try{
        const res=await api.post("users/review",data);
        return res.data;
    }
    catch(error){
        throw error;

    }
}