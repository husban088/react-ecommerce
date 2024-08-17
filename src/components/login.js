import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "./InputControl";
import { auth } from "./firebase";

import styles from "./Signin.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };


  const [inputOpen, setInputOpen] = useState(false);

  const carts = JSON.parse(localStorage.getItem('cart')) || []


  let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>


<div className="inpt__box text-black">
        <input type='text' placeholder='Search' className={`inpt-dropdown ${inputOpen ? 'active' : 'inactive'}`} />
        <i className="fa-solid w-0 fa-magnifying-glass search-icon text-lg cursor-pointer" onClick={() => setInputOpen(!inputOpen)}></i>

        <Link to={'/cart'}><i class="fa-solid fa-cart-shopping text-black text-xl cursor-pointer cart__icon"><sup className='cart-sup'>{cartNumbers}</sup></i></Link>
      </div>



           <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;