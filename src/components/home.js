import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { Newfit } from './newfit';
import { womenfit } from './womenlist';
import { Offcanvas, Button } from 'react-bootstrap';


function Home() {

  const navigate = useNavigate();


  const handleCart = (newfit) => {
    console.log(newfit)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductExist = cart.find(item => item.id === newfit.id)
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === newfit.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...newfit, quantity: 1 }]))
    }
    navigate('/')
  }

  const [inputOpen, setInputOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const carts = JSON.parse(localStorage.getItem('cart')) || []


  let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

  const [searchTerm, setsearchTerm] = useState("")


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
    navigate('/')
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
    navigate('/')
  }

  const handleRemove = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/')
  }

  const [totals, setTotals] = useState(0)

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotals(total)

  }, [carts])


  const [show, setShow] = useState(false);
  const cartRef = useRef(null);



  return (
    <>



      <div className="inpt__box text-black">
        <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`} onChange={(event) => { setsearchTerm(event.target.value) }}/>
        <i className="fa-solid w-0 fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i>

        <i class="fa-solid fa-cart-shopping text-black text-xl cursor-pointer cart__icon" onClick={() => setShow(!show)}><sup className='cart-sup'>{cartNumbers}</sup></i>
      </div>



      {/* =================== NEW FIT SECTION ==================== */}

      <div className="card text-bg-dark border-0 pehla__card" style={{marginTop: "1rem"}}>
        <img src="./assets/FRONT_BANNER_..webp" class="card-img" alt="banner" />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className='container cont__ban'>
            <h5 className="card-title display-6 fw-bolder mb-0">NEW MONTH NEW FRESH FITS</h5>
            <p className="card-text lead fs-5">Upgrade your wardrobe with our trendiest finds</p>
            <div className='ban__button'>
              <Link to={'/mens'} className='men__btn ban__btn'>SHOP MENS</Link>
              <Link to={'/women'} className='women__btn ban__btn'>SHOP WOMENS</Link>
            </div>
          </div>

        </div>
      </div>


      <div className='new__fits'>
        <div className="new__head"  style={{marginBottom:"-3rem"}}>
          <h2 className="new__text">NEW FRESH FITS</h2>
        </div>

       <div className='fit__container'>

       <div className='new__cont'>
          {
             Newfit.filter((newfit) => {
              if (searchTerm == "") {
                return newfit;
              } else if (newfit.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return newfit
              }
            })

           .map((newfit) => {
            return (
              <>

                <div className="new__section">

                <div className='new__icons'>
                    <p className='new__icon'>NEW</p>
                  </div>

                  <div className='heart-icons'>
                    <i class="fa-regular fa-heart heart-icon"></i>
                  </div>

                  <div className="new__image">
                    <Link to={`/mensdetails/${newfit.id}`} style={{ textDecoration: "none" }} key={newfit.id}><img src={newfit.image} alt={newfit.name} className="new__img"/></Link>
                  </div>
                  <div className="new__box">
                    <div className="new__details">
                    </div>
                    <p className="new__name">{newfit.name}</p>
                    <p className="new__price">Rs {newfit.price}</p>
                  </div>
                  <div className="cart__button">
                    <button className="cart__btn" onClick={() => handleCart(newfit)}>Add to Cart</button>
                  </div>
                </div>

              </>
            )
          })

          }
        </div>

       </div>

      </div>


      {/* =================== GIRLS SECTION ==================== */}

      <div className="card text-bg-dark border-0">
        <img src="./assets/web_banner_bra_1880_x_720.webp" class="card__img" alt="banner" />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className='container'>
            <h5 className="card-title text-black display-6 fw-bolder mb-0">NEW MONTH NEW FRESH FITS</h5>
            <p className="card-text text-black lead fs-5 fw-bolder">Upgrade your wardrobe with our trendiest finds</p>
            <div className='ban__button'>
              {/* <Link className='men__btn ban__btn'>SHOP MENS</Link> */}
              <Link to={'/women'} className='women__btn women__buttons' id='girl__btn'>SHOP NOW</Link>
            </div>
          </div>

        </div>
      </div>


      <div className='new__fits'>
        <div className="new__head">
          <h2 className="new__text">WOMEN FITS</h2>
        </div>

        <div className='fit__container'>

        <div className='new__cont'>
          {
          
          womenfit.filter((womenfit) => {
            if (searchTerm == "") {
              return womenfit;
            } else if (womenfit.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return womenfit
            }
          })

          .map((womenfit) => {
            return (
              <>

                <div className="new__section">

   

                  <div className='heart-icons'>
                    <i class="fa-regular fa-heart heart-icon"></i>
                  </div>

                  <div className="new__image">
                    <Link to={`/womendetails/${womenfit.id}`} style={{ textDecoration: "none" }} key={womenfit.id}><img src={womenfit.image} alt={womenfit.name} className="new__img" /></Link>
                  </div>
                  <div className="new__box">
                    <div className="new__details">
                    </div>
                    <p className="new__name">{womenfit.name}</p>
                    <p className="new__price">Rs {womenfit.price}</p>
                  </div>
                  <div className="cart__button">
                    <button className="cart__btn" onClick={() => handleCart(womenfit)}>Add to Cart</button>
                  </div>
                </div>

              </>
            )
          })
          }
        </div>
        </div>

      </div>


      {/* ================ FIND FITT SECTION ================= */}

     <div className='find__section'>
        <div className='find__head'>
          <h2 className='find__text'>FIND YOUR FIT</h2>
          <p className='find__para'>Shop gym tops, bottoms, leggings, shorts, & more.</p>
        </div>

        <div className='find__container'>
        <div className='find__cont'>
          <div className='find__image'>
            <img src='./assets/find1.webp' alt='findimage' className='find__img' />
            <h2 className='find__name'>Trousers</h2>
          </div>

          <div className='find__image'>
            <img src='./assets/find2.webp' alt='findimage' className='find__img' />
            <h2 className='find__name'>Sweatpants</h2>
          </div>

          <div className='find__image'>
            <img src='./assets/find3.webp' alt='findimage' className='find__img' />
            <h2 className='find__name'>T-Shirts & Tops</h2>
          </div>

          <div className='find__image'>
            <img src='./assets/find4.webp' alt='findimage' className='find__img' />
            <h2 className='find__name'>Crops Tops</h2>
          </div>
        </div>
        </div>

      </div>



{/* =================== CXART SECTION ======================= */}


<Offcanvas show={show} onHide={() => setShow(false)} placement="start" ref={cartRef} className="cart__sidebar" style={{overflowX:"hidden"}}>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Cart</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>




  <div className="overflow-hidden sidebar__cartt" style={{overflowX:"hidden"}}>
  <div className="inset-0 overflow-hidden" style={{overflowX:"hidden"}}>
    <div className="pointer-events-none inset-y-0 flex pl-10" style={{overflowX:"hidden"}}>

      <div className="cart__sec pointer-events-auto w-screen max-w-xl w-full">
        <div className="flex h-full flex-col overflow-y-hidden bg-white">
          <div className="flex-1 overflow-y-hidden px-5 py-6 sm:px-5 cart__carts">
            <div className="cart__head flex items-start justify-between">
              <h2 className="shop__text product__cart text-lg font-medium" id="slide-over-title">Product</h2>
              <div className="ml-3 flex h-7 items-center">
                {/* <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button> */}
                <p className="item__text text-lg font-bold price__head">Price</p>
              </div>
            </div>

            {
              carts.map(cart => {
                return (
                  <div className="cart__cont mt-9">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        <li className="flex py-6 justify-left items-left">
                          <div className="cart-image h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={cart.image} alt={cart.name} className="cart__img h-full w-full object-contain object-center" />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div className='cart__detailss'>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className='cart__name cart-name'>
                                {cart.name}
                                </h3>
                                <p className="ml-4 cart__price cart-price">Rs {cart.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 cart__cat categ-text">{cart.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="quan__box cart-quan">
                                <span className="decre__btn"><i className="fa fa-minus" onClick={() => handleDecre(cart.id)}></i></span>
                                <span className="text-gray-500 cart__quan">{cart.quantity}</span>
                                <span className="incre__btn"><i className="fa fa-plus" onClick={() => handleIncre(cart.id)}></i></span>
                              </div>



                              <div className="flex">
                                <button type="button" className="font-medium text-black hover:text-indigo-500 cart-remove cart__delte" onClick={() => handleRemove(cart?.id)}><i class="fa-solid fa-xmark"></i></button>
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

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900 total__container">
              <p className='sub__text'>total</p>
              <p className='total__text total__para'>Rs {totals}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 check__para">Shipping and taxes calculated at checkout.</p>
            <div className="cont__btn viewcart__btn">
              <Link to={'/cart'} className="cont__button">View cart</Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p className='continue__btn'>
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








  </Offcanvas.Body>
</Offcanvas>



    </>
  );
}

export default Home;