import {BrowserRouter,Routes, Route} from 'react-router-dom'
import {Header} from './Components/Header/Header'
import {Login} from './Components/Login/Login'
import {SignUp} from './Components/SignUp/SignUp'
import {Sitemap} from './Components/Sitemap/Sitemap'
import {Cart} from './Components/Cart/Cart'
import {Error} from './Components/Error/Error'
import {AdminLogIn} from './Components/AdminLogIn/AdminLogIn'
import {AdminDashboard} from './Components/AdminDashboard/AdminDashboard'
import {ManageStaff} from './Components/ManageStaff/ManageStaff'
import { AddStaff } from './Components/AddStaff/AddStaff'
import { AddSuperUser } from './Components/AddSuperUser/AddSuperUser'
import { ManageProducts } from './Components/ManageProducts/ManageProducts'
import { ProductDash } from './Components/ProductDash/ProductDash'
import { AddProduct } from './Components/AddProduct/AddProduct'
import { UpdateProduct } from './Components/UpdateProduct/UpdateProduct'
import { Product } from './Components/Product'


function App() {
  
  



 return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path = '/*' element={<Error />} />
    <Route path = '/'  element = { <> <Header/><Product/> <Sitemap /> </> } />
    <Route path = '/login'  element = { <Login /> } />
    <Route path = '/signup'  element = { <SignUp /> } />
    <Route path = '/admin'  element = { <AdminLogIn /> } />
    <Route path = '/admindash'  element = { <AdminDashboard /> } />
    <Route path = '/managestaff'  element = { <ManageStaff /> } />
    <Route path = '/manageproducts'  element = { <ManageProducts /> } />
    <Route path = '/addstaff'  element = { <AddStaff /> } />
    <Route path = '/addsuperuser'  element = { <AddSuperUser /> } />
    <Route path = '/productdash'  element = { <ProductDash /> } />
    <Route path = '/addProduct'  element = { <AddProduct /> } />
    <Route path = '/updateProduct/:id'  element = { <UpdateProduct /> } />
    <Route path = '/cart'  element = {<> <Header /> <Cart /> <Sitemap /> </> } />

  </Routes>
  </BrowserRouter>
  </>
 )
}

export default App;
