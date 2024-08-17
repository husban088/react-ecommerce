// import React, { useEffect, useState } from "react";
// import '../App.css';
// import {auth, db} from './firebase';
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";



// const Profile = () => {

//     const [userdetailss, setUserdetailss] = useState(null);
//     const navigate = useNavigate();

//     const fetchUserData = async()=> {
//         auth.onAuthStateChanged(async(user)=> {
//             console.log(user);
//             const docRef = doc(db, "Users", user.uid);
//             const docSnap = await getDoc(docRef);
//             if(docSnap.exists()) {
//                 setUserdetailss(docSnap.data())
//                 console.log(docSnap.data());
//             }else {
//                 console.log("User is not Logged in");
//             }
//         })
//     }

//     useEffect(()=> {
//         fetchUserData();
//     },[])


//    async function handleLogout() {
//         try {
//            await auth.signOut();
//              navigate("/login");
//             console.log("User Logged out successfully");
//         } catch (error) {
//             console.log("Error Logged out successfully", error.message);
//         }
//     }

//     return (
//         <>
//           {userdetailss ? (
//             <>
//             {/* <div style={{ display: "flex", justifyContent: "center" }}>
//             <img
//               src={userdetails.photoURL}
//               width={"40%"}
//               style={{ borderRadius: "50%" }}
//               alt="pic"
//             />
//           </div> */}
//              <div className="user-details">
//              <h3> Welcome {userdetails.firstName}</h3>
//               <div>
//               <h3>{userdetails.email}</h3>
//               <h3>{userdetails.firstName}</h3>
//               <h3>{userdetails.lastName}</h3>
//               </div>
//               <button className="log__btn" onClick={handleLogout}>Logout</button>
//              </div>
//             </>
//           ) : (
//             <p>Loading...</p>
//           )
//         }
//         </>
//     )
// }

// export default Profile;