import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "./firebase";

import styles from "./Signup.module.css";
import '../App.css';

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
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
          <h1 className={styles.heading}>Signup</h1>

          <InputControl
            label="Name"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            label="Email"
            placeholder="Enter email address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            label="Password"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}>
              Signup
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;