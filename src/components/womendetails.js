import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import { signInWithPopup } from 'firebase/auth';
import { auth, providers } from './firebase';
import { womenfit } from './womenlist';

function Womendetails() {

  const [product, setProduct] = useState({})
  const { id } = useParams();
  const [inputOpen, setInputOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();


  const carts = JSON.parse(localStorage.getItem('cart')) || []


  let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);




  useEffect(() => {

    const filterProducts = womenfit.filter((product) => product.id == id)
    setProduct(filterProducts[0])

  }, [id])



  const handleCart = (womenfit) => {
    console.log(womenfit)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductExist = cart.find(item => item.id === womenfit.id)
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === womenfit.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...womenfit, quantity: 1 }]))
    }
    navigate('/cart')
  }



  return (
    <>

      <div className="inpt__box text-black">
        <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`} />
        <i className="fa-solid w-0 fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i>

        <Link to={'/cart'}><i class="fa-solid fa-cart-shopping text-black text-xl cursor-pointer cart__icon" onClick={() => setCartOpen(!cartOpen)}><sup className='cart-sup'>{cartNumbers}</sup></i></Link>
      </div>


      

      <div className='wear__cont'>
        <div className='row'>
          <div className='col-1-of-2'>
            <div className='wear__image'>
              <img src={product.image} alt={product.name} className='wear__img' />
            </div>
          </div>
          <div className='col-1-of-2'>
            <div className='wear__section'>
              <div className='wear__details'>
                <h3 className='wear__name'>{product.name}</h3>
                <p className='wear__para'>Vendor: IRONGEAR Fitness</p>
                <p className='wear__para'>SKU: LCFTLS-LGRY-1596-XS</p>
                <p className='wear__para'>Type: T-Shirts & Tops</p>
                <h2 className='wear__name'>Rs. {product.price}</h2>
              </div>
              <div className='size__cont'>
                <p className='size__text'>Size</p>
                <p className='wear__size'><span className='s__text'>S</span> <span className='s__text m__text'>M</span> <span className='s__text l__text'>L</span> <span className='s__text xl__text'>XL</span></p>
              </div>
              <div className='wear__button'>
                <button className='wear__btn' onClick={() => handleCart(product)}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Womendetails;