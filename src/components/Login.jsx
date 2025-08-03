import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { db } from "../firebase/firebase.config";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useDataContext } from "../context/DataContext";
import { Redirect } from "react-router";

const Login = () => {
  const { user, setUser } = useDataContext();
  const auth = getAuth();

  const guestLogin = async () => {
  const guestId = "guest_" + Date.now();
    const newUser = {
    name: "Guest",
    email: "",
    profile_image: "https://ui-avatars.com/api/?name=Invitado&background=random",
    zone: "ES",
    date_register: new Date().toISOString(),
    movies: { to_watch: [], watched: [] },
    tv_shows: { to_watch: [], watched: [] },
    isGuest: true,
  };

   try {
    await setDoc(doc(db, "users", guestId), newUser);
    localStorage.setItem("user_project_cambur", guestId);
    setUser({ ...newUser, id: guestId });
  } catch (e) {
    console.error("Error creando usuario invitado:", e);
  }
};

  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const querySnapshot = await getDocs(collection(db, "users"));
      const existingUser = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === res.user.uid) {
          existingUser.push({ ...doc.data(), id: doc.id });
        }
      });
      if (existingUser.length === 0) {
        try {
          const newUser = {
            name: res.user.displayName,
            email: res.user.email,
            profile_image: res.user.photoURL,
            zone: "BO",
            date_register: res.user.metadata.creationTime,
            movies: { to_watch: [], watched: [] },
            tv_shows: { to_watch: [], watched: [] },
          };
          await setDoc(doc(db, "users", res.user.uid), newUser);
          setUser(newUser);
          localStorage.setItem("user_project_cambur", res.user.uid);
        } catch (e) {
          console.error("Error create user: ", e);
        }
      } else {
        localStorage.setItem("user_project_cambur", existingUser[0].id);
        setUser(existingUser[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="card container mt-3 col-12 col-sm-5 col-md-4 col-lg-3">
      <div className="card-header text-center bg-white">
        <p className="h4">Account Login</p>
      </div>
      <div className="card-body d-flex justify-content-center">
        <div style={{ height: "100px", width: "100px", borderRadius: "50%" }}>
          <img
            src="./images/profile_default.png"
            alt="profile"
            style={{ borderRadius: "50px", height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <hr />
      <button className="btn btn-primary d-flex justify-content-center align-items-center mb-3" onClick={googleAuth}>
        <img src="./images/google.png" alt="google" style={{ height: "30px" }} className="px-2" />{" "}
        <b className="px-2">Login with Google</b>
      </button>
       <button className="btn btn-secondary col-8 mx-auto d-flex justify-content-center align-items-center mb-3" onClick={guestLogin}>
        <b className="px-2">Enter as a guest</b>
      </button>
    </div>
  );
};

export default Login;
