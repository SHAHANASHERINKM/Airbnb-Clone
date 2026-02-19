import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import PropertyCard from './components/PropertyCard'
import Explore from './pages/Explore'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'
import FilteredList from './pages/FilteredList'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ConfirmAndPay from './pages/Confirm&Pay/ConfirmAndPay'
import WishList from './pages/WishList'
import Bookings from './pages/Bookings'
import HostLayout from './pages/Host/HostLayout'
import Dashboard from './pages/Host/Dashboard'
import Property from './pages/Host/Property'
import AddProperty from './pages/Host/AddProperty'
import HostBookings from './pages/Host/HostBookings'
import HostRoutes from './routes/HostRoutes'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminRoutes from './routes/AdminRoutes'
import UsersList from './pages/Admin/UsersList'
import HostList from './pages/Admin/HostList'
import HostRequests from './pages/Admin/HostRequests'
import Properties from './pages/Admin/Properties'
import UserRoutes from './routes/UserRoutes'
import ApprovalProperty from './pages/Admin/ApprovalProperty'
import BookingManagement from './pages/Admin/BookingManagement'
import PropertyView from './pages/Admin/PropertyView'

function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        <Route element={<UserRoutes>
          <Layout/>
        </UserRoutes>}>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/filter' element={<FilteredList />} />
          <Route path='/property-details/:id' element={<PropertyDetails />} />
          <Route path='/payment/:id' element={<ConfirmAndPay />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/bookings' element={<Bookings />} />
        </Route>

        <Route path='/host' element={<HostRoutes>
          <HostLayout />
        </HostRoutes>}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='addProperty' element={<AddProperty />} />
          <Route path='editProperty/:id' element={<AddProperty />} />
          <Route path="property" element={<Property />} />
          <Route path="propertyBookings" element={<HostBookings />} />

        </Route>

        <Route path='/admin' element={<AdminRoutes>
          <AdminLayout />
        </AdminRoutes>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='users'  element={<UsersList/>}/>
          <Route path="hosts" element={<HostList/>}/>
          <Route path='host-requests' element={<HostRequests/>}/>
          <Route  path='properties' element={<Properties/>}/>
          <Route path='property-approvals' element={<ApprovalProperty/>}/>
          <Route path='bookings' element={<BookingManagement/>}/>
          <Route path="viewProperty/:propertyId" element={<PropertyView/>} />

        </Route>
      </Routes>

    </BrowserRouter>

  )
}

export default App
