import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import { signInWithPopup } from 'firebase/auth';
import {auth, providers} from './firebase'
import logo from './images/logo1.avif'


function Cart() {


  const navigate = useNavigate();

  const carts = JSON.parse(localStorage.getItem('cart')) || []


  let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

  const handleDecre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const handleIncre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const handleRemove = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const [totals, setTotals] = useState(0)

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotals(total)

  }, [carts])

  const [inputOpen, setInputOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);


  return (
    <>
    <div className="inpt__box text-black">
        <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`}/>
        <i className="fa-solid w-0 fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i>

        <Link to={'/cart'}><i class="fa-solid fa-cart-shopping text-black text-xl cursor-pointer cart__icon" onClick={() => setCartOpen(!cartOpen)}><sup className='cart-sup'>{cartNumbers}</sup></i></Link>
      </div>

      <div className='cart__containers' style={{width: "50%", marginRight: "auto",marginLeft: "auto",marginTop: "6rem"}}>
  

  {/* <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

<div className="overflow-hidden cart__containerss">
  <div className="inset-0 overflow-hidden ">
    <div className="pointer-events-none inset-y-0 flex pl-10">

      <div className="cart__sec pointer-events-auto w-screen max-w-xl w-full">
        <div className="flex h-full flex-col overflow-y-hidden bg-white">
          <div className="flex-1 overflow-y-hidden px-5 py-6 sm:px-5 cart__carts">
            <div className="cart__head flex items-start justify-between">
              <h2 className="shop__text product__heads text-lg font-medium" id="slide-over-title">Product</h2>
              <div className="ml-3 flex h-7 items-center">
                {/* <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button> */}
                <p className="item__text text-lg font-bold price__heads">Price</p>
              </div>
            </div>

            <div className=''>
            {
              carts.map(cart => {
                return (
                  <div className="cart__cont mt-9">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        <li className="flex py-6 justify-left items-left">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={cart.image} alt={cart.name} className="cart__img h-full w-full object-contain object-center" />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className='cart__name'>
                                {cart.name}
                                </h3>
                                <p className="ml-4 cart__price price__texts" >Rs {cart.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 cart__cat">{cart.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="quan__box quan__container">
                                <span className="decre__btn"><i className="fa fa-minus" onClick={() => handleDecre(cart.id)}></i></span>
                                <span className="text-gray-500 cart__quan">{cart.quantity}</span>
                                <span className="incre__btn"><i className="fa fa-plus" onClick={() => handleIncre(cart.id)}></i></span>
                              </div>



                              <div className="flex">
                                <button type="button" className="font-medium text-black hover:text-indigo-500 cart-remove delete__carts" onClick={() => handleRemove(cart?.id)}><i class="fa-solid fa-xmark"></i></button>
                              </div>

                            </div>
                          </div>
                        </li>


                      </ul>
                    </div>

                  </div>
                )
              })
            }
            </div>


          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
              <p className='sub__text'>total</p>
              <p className='total__text'>Rs {totals}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            {/* <div className="cont__btn">
              <Link to={'/cart'} className="cont__button">View cart</Link>
            </div> */}
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to={'/'} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>


  </div>

    </>
  );
}

export default Cart;