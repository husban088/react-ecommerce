import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, providers, provider, db } from './firebase'
import logo from './images/logo1.avif'
// import {auth, db} from './firebase';
import { doc, getDoc } from "firebase/firestore";
import userphotoURL from './images/userpng.jpg';
import { toast, ToastContainer } from 'react-toastify';
import pnguser from './images/pnguser.png';
import { FirebaseError } from 'firebase/app';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

import { Modal, Button, Image, Dropdown, NavbarOffcanvas, Col, Row, Container} from 'react-bootstrap';

// import { Navbar, Nav, Container, Offcanvas, Col, Row, Button } from 'react-bootstrap';

// import { Button, Container, Row, Col } from 'react-bootstrap';




function Navbarx(props) {

  // const [inputOpen, setInputOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openss, setOpenss] = useState(false);

  // const [modale, setModale] = useState(false);

  const navigate = useNavigate();

  // const toggleModale = () => {
  //   setModale(!modale);
  // }

  // const fetchUserData = async () => {
  //   auth.onAuthStateChanged(async (user) => {
  //     console.log(user);
  //     setUser(user)

  //     const docRef = doc(db, "Users", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setUser(docSnap.data());
  //       console.log(docSnap.data());
  //     } else {
  //       console.log("User is not logged in");
  //     }
  //   });
  // };



  const [userdetailss, setUserdetailss] = useState(null);

  const fetchUserDatas = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data())
        console.log(docSnap.data());
      } else {
        console.log("User is not Logged in");
      }
    })
  }


  useEffect(() => {

    fetchUserDatas()

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

    });

    return () => unsubscribe();

  }, []);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);



  const signInWithGooogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log('LOGGED USER', result.user);
      setUser(result.user);
      setShow(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      // navigate('/')
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }






  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log('LOGGED USER', result.user);
      setUser(result.user);
      setShow(false)


      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // fetch facebook graph api to get user actual profile picture
      fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
        .then((response) => response.blob())
        .then((blob) => {
          setProfilePicture(URL.createObjectURL(blob));
        })


    } catch (error) {
      console.log(error)
    }
  }

  // const handleLogouts=()=>{
  // setUser(null);
  // toast("user logged out successfully")
  // }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [shows, setShows] = useState(false);

  const handleImageClick = () => {
    setShows(true);
  };

  const handleOutsideClick = () => {
    setShows(false);
  };


  const [navShow, setnavShow] = useState(false);
  const navRef = useRef(null);


  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-white sticky-top shadow-sm">
        <div class="container-fluid">
        <i class="fa-solid fa-bars menu__icon" onClick={() => setnavShow(!navShow)}></i>
         <Link to={'/'} class="navbar-brand"><img src={logo} alt="IRONGEAR" /></Link>
          {/* <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header bg-white">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel"><img src="images/logo.avif" alt="IRONGEAR" /></h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body bg-white align-center">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-10 nav-underline" style={{ marginTop: "8px" }}>
                <li class="nav-item">
                  <Link to={'/'} class="nav-link px-3 text-black" aria-current="page">Home</Link>
                </li>
                <li class="nav-item">
                  <Link to={'/mens'} class="nav-link px-3 text-black" >Men</Link>
                </li>
                <li class="nav-item">
                  <Link to={'/women'} class="nav-link px-3 text-black">Women</Link>
                </li>

              </ul>
              {/* <form class="d-flex mt-3" role="search"> */}
              {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-dark" type="submit">Search</button> */}



              <form className="inpt__box d-flex mt-3 text-black">
                {/* <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`} />
                <i className="fa-solid fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i> */}

                {/* {!user ?
                  // <i className="fa-regular fa-user text-black text-xl user-icon cursor-pointer" onClick={toggleModale}></i>
                  <Button variant="white" onClick={handleShow} style={{border:"none", outline:"none"}}>
             <i className="fa-regular fa-user text-black text-xl user-icon cursor-pointer"></i>
                  </Button>


                  :
                  // <img src={user.photoURL} alt='userimg' className='user__img' onClick={() => setOpens(!opens)} />
                  <Image src={user.photoURL || pnguser} alt='userimg' onClick={handleImageClick} className='user__img'/>
                } */}



                {/* {!userdetailss ?
                  <i className="fa-regular fa-user text-black text-xl user-icon cursor-pointer" onClick={toggleModale}></i> :
                  <img src={userdetailss.photoURL} alt='userimg' className='user__img' onClick={() => setOpen(!open)} />
                } */}


              </form>


              {/* </form> */}
            </div>
          </div>
        </div>

      </nav>

      {!user ?
        // <i className="fa-regular fa-user text-black text-xl user-icon cursor-pointer" onClick={toggleModale}></i>
        <Button variant="white" onClick={handleShow} style={{ border: "none", outline: "none" }} className='user__button'>
          <i className="fa-regular fa-user text-black text-xl user-icon cursor-pointer"></i>
        </Button>


        :
        // <img src={user.photoURL} alt='userimg' className='user__img' onClick={() => setOpens(!opens)} />
        <Image src={user.photoURL || pnguser} alt='userimg' onClick={handleImageClick} className='user__img' />
      }


      {
        user &&
        <>
          <Dropdown show={shows} onToggle={handleOutsideClick} className='drop__img'>
            {/* <Dropdown.Toggle>
          Dropdown toggle
        </Dropdown.Toggle> */}
            <Dropdown.Menu className='drop__imgs'>
              <Dropdown.Item>
                <div className='log__user'>
                  <img src={user.photoURL || pnguser} alt='userimg' className='users__imgs' />
                  <p className='log__name'>Hello <p>{user.displayName || userName}</p></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div>
                  {/* <p className='user-name'><i class="fa-regular fa-user"></i> Welcome {user.displayName}</p> */}
                  <p className='user-name'><i class="fa-regular fa-envelope"></i> <span className='log__email'>{user.email}</span></p>
                </div>
              </Dropdown.Item>

              <Dropdown.Item>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </>
      }


      <Modal show={show} onHide={handleClose} className='modal__user'>
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='log__image'>
            <img src='./assets/logo1.avif' alt='logo' className='log__img' />
          </div>

          <div className='fb__button'>
            <p className='fb__btn' id='fb__btn' onClick={signInWithFacebook}><img src={fbicon} alt='fbicon' className='fb__icon' /> Login with facebook</p>
            <ToastContainer />
          </div>
          <div className='fb__button'>
            <p className='fb__btn' onClick={signInWithGooogle}><img src={googleicon} alt='fbicon' className='fb__icon' /> Login with google</p>
            <ToastContainer />
          </div>
          <div className='log__button'>
            <Link to={'/signup'} className='log__btn'>Sign up</Link>
          </div>
          <div className='log__button'>
            <Link to={'/login'} className='log__btn'>Sign in</Link>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>



<div className={`nav-side ${navShow? 'active' : 'inactive'}`} navShow={navShow} onHide={() => setnavShow(false)}  id='nav__sidebar' ref={navRef}>
  <div className='navside__logo'>
    <img src='./assets/logo1.avif' className='navside__logo'/>
  </div>
  <ul className='navside__ul'>
    <li><Link to={'/'} className='navside__link'>Home</Link></li>
    <li><Link to={'/mens'} className='navside__link'>Men</Link></li>
    <li><Link to={'/women'} className='navside__link'>Women</Link></li>
  </ul>
</div>



    </>
  );
}

export default Navbarx;