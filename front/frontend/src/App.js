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
function App() {




 return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path = '/*' element={<Error />} />
    <Route path = '/'  element = { <> <Header /> <Sitemap /> </> } />
    <Route path = '/login'  element = { <Login /> } />
    <Route path = '/signup'  element = { <SignUp /> } />
    <Route path = '/admin'  element = { <AdminLogIn /> } />
    <Route path = '/admindash'  element = { <AdminDashboard /> } />
    <Route path = '/managestaff'  element = { <ManageStaff /> } />
    <Route path = '/cart'  element = {<> <Header /> <Cart /> <Sitemap /> </> } />

  </Routes>
  </BrowserRouter>
  </>
 )
}

export default App;
