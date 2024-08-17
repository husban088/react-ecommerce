import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import { signInWithPopup } from 'firebase/auth';
import { auth, providers } from './firebase';
import { womenfit } from './womenlist';
import { Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';


function Women() {

  const [product, Setproduct] = useState(womenfit)
  console.log(product)

  const filteritems = (catItem) => {
    const updateitems = womenfit.filter((curitem)=> {
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

      const [selectedValue, setSelectedValue] = useState('ALL');

      const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
      };


    return (
        <>

            <div className="inpt__box text-black">
                <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`}  onChange={(event) => { setsearchTerm(event.target.value) }} />
                <i className="fa-solid w-0 fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i>

                <Link to={'/cart'}><i class="fa-solid fa-cart-shopping text-black text-xl cursor-pointer cart__icon" onClick={() => setCartOpen(!cartOpen)}><sup className='cart-sup'>{cartNumbers}</sup></i></Link>
            </div>


            <div className='new__fits' style={{marginTop:"7rem"}}>
        <div className="new__head" style={{textAlign:"center"}}>
          <h2 className="new__text">WOMEN</h2>
        </div>



        {/* <div className='man__buttons'>
          <button className='man__btn' onClick={()=> Setproduct(womenfit)}>ALL</button>
            <button className='man__btn' onClick={()=> filteritems("women tops")}>Tops</button>
            <button className='man__btn' onClick={()=> filteritems("women tshirt")}>T shirt</button>
          </div> */}


<Dropdown style={{textAlign:"center", marginTop:"1rem"}}>
      <DropdownButton id="dropdown-basic-button" title={selectedValue} onSelect={handleSelect}>
        <DropdownItem eventKey="ALL" onClick={()=> Setproduct(womenfit)}>ALL</DropdownItem>
        <DropdownItem eventKey="T shirt" onClick={()=> filteritems("women tops")}>Tops</DropdownItem>
        <DropdownItem eventKey="Tanks" onClick={()=> filteritems("women tshirt")}>T shirt</DropdownItem>
      </DropdownButton>
    </Dropdown>


    <div className='fit__container'>

        <div className='new__cont'>
          {
             product.filter((womenfit) => {
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

        </>
    );
}

export default Women;