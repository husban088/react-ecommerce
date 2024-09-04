
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Navbar from './components/navbar';
import Mensdetails from './components/mensdetails';
import Cart from './components/cart';
import Mens from './components/mens';
import Women from './components/women';
import Womendetails from './components/womendetails';
import Signup from './components/signup';
import Login from './components/login';
import Profile from './components/profile';
import Mandetail from './components/mandetail';
import Navbarx from './components/navbar';
import InputControl from './components/InputControl';
import Footer from './components/footer';
import CheckoutPage from './components/checkout';


function App() {
  return (
    <>
    <Navbarx />
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/mens' element={<Mens />}/>
      <Route path='/women' element={<Women />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/checkout' element={<CheckoutPage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/mensdetails/:id' element={<Mensdetails />}/>
      <Route path='/mandetail/:id' element={<Mandetail />}/>
      <Route path='/womendetails/:id' element={<Womendetails />}/>
      <Route path='inputcontrol' element={<InputControl />}/>
     </Routes>
     <Footer />
    </>
  );
}

export default App;
