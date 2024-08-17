import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import { signInWithPopup } from 'firebase/auth';
import { auth, providers } from './firebase';
import { menslist } from './menslist';

import { Dropdown, DropdownButton, DropdownItem, Image } from 'react-bootstrap';


function Mens() {

  const [product, Setproduct] = useState(menslist)
  console.log(product)

  const filteritems = (catItem) => {
    const updateitems = menslist.filter((curitem)=> {
      return curitem.category === catItem
    });
    Setproduct(updateitems); 
  }

  const [inputOpen, setInputOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [searchTerm, setsearchTerm] = useState("")

  const navigate = useNavigate();


  const carts = JSON.parse(localStorage.getItem('cart')) || []


  let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

  const handleCart = (menslist) => {
    console.log(menslist)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductExist = cart.find(item => item.id === menslist.id)
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === menslist.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...menslist, quantity: 1 }]))
    }
    navigate('/cart')
  }

  const [selectedValue, setSelectedValue] = useState('ALL');

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };



  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (cartRef.current && !cartRef.current.contains(event.target)) {
  //       setShow(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);




  return (
    <>

      <div className="inpt__box text-black">
        <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`} onChange={(event) => { setsearchTerm(event.target.value) }} />
        <i className="fa-solid w-0 fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i>

        <Link to={'/cart'}><i class="fa-solid fa-cart-shopping text-black text-xl cursor-pointer cart__icon" onClick={() => setCartOpen(!cartOpen)}><sup className='cart-sup'>{cartNumbers}</sup></i></Link>
      </div>


      <div className='new__fits' style={{ marginTop: "7rem" }}>
        <div className="new__head" style={{ textAlign: "center" }}>
          <h2 className="new__text">MENS</h2>
          </div>

          {/* <div className='man__buttons'>
          <button className='man__btn' onClick={()=> Setproduct(menslist)}>ALL</button>
            <button className='man__btn' onClick={()=> filteritems("mens shirt")}>T shirt</button>
            <button className='man__btn' onClick={()=> filteritems("mens tanks")}>Tanks</button>
            <button className='man__btn' onClick={()=> filteritems("mens pants")}>Trousers</button>
            <button className='man__btn' onClick={()=> filteritems("mens shorts")}>Shorts</button>
          </div> */}




<Dropdown style={{textAlign:"center", marginTop:"1rem"}}>
      <DropdownButton id="dropdown-basic-button" title={selectedValue} onSelect={handleSelect}>
        <DropdownItem eventKey="ALL" onClick={()=> Setproduct(menslist)}>ALL</DropdownItem>
        <DropdownItem eventKey="T shirt" onClick={()=> filteritems("mens shirt")}>T shirt</DropdownItem>
        <DropdownItem eventKey="Tanks" onClick={()=> filteritems("mens tanks")}>Tanks</DropdownItem>
        <DropdownItem eventKey="Trousers" onClick={()=> filteritems("mens pants")}>Trousers</DropdownItem>
        <DropdownItem eventKey="Shorts" onClick={()=> filteritems("mens shorts")}>Shorts</DropdownItem>
      </DropdownButton>
    </Dropdown>





    <div className='fit__container'>

        <div className='new__cont'>
          {
            product.filter((menslist) => {
              if (searchTerm == "") {
                return menslist;
              } else if (menslist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return menslist
              }
            })

              .map((menslist) => {
                return (
                  <>

                    <div className="new__section">

                      <div className='heart-icons'>
                        <i class="fa-regular fa-heart heart-icon"></i>
                      </div>

                      <div className="new__image">
                        <Link to={`/mandetail/${menslist.id}`} style={{ textDecoration: "none" }} key={menslist.id}><img src={menslist.image} alt={menslist.name} className="new__img" /></Link>
                      </div>
                      <div className="new__box">
                        <div className="new__details">
                        </div>
                        <p className="new__name">{menslist.name}</p>
                        <p className="new__price">Rs {menslist.price}</p>
                      </div>
                      <div className="cart__button">
                        <button className="cart__btn" onClick={() => handleCart(menslist)}>Add to Cart</button>
                      </div>
                    </div>

                  </>
                )
              })

          }
        </div>

        </div>

      </div>

    </>
  );
}

export default Mens;