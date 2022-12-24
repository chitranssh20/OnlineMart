import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'
import {Header} from './Components/Header/Header'
import {Login} from './Components/Login/Login'
import {SignUp} from './Components/SignUp/SignUp'
import {Sitemap} from './Components/Sitemap/Sitemap'
import {Cart} from './Components/Cart/Cart'
import {Error} from './Components/Error/Error'
function App() {




 return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path = '/*' element={<Error />} />
    <Route path = '/'  element = { <> <Header /> <Sitemap /> </> } />
    <Route path = '/login'  element = { <Login /> } />
    <Route path = '/signup'  element = { <SignUp /> } />
    <Route path = '/cart'  element = {<> <Header /> <Cart /> <Sitemap /> </> } />

  </Routes>
  </BrowserRouter>
  </>
 )
}

export default App;
