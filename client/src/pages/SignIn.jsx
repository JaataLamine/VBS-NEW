import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Operations a effectuer pr se connecter
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // currentUser === currentUser
      //   ? navigate("/")
      //   : currentUser.isSuperAdmin
      //   ? navigate("/SuperAdminDashboard/")
      //   : navigate("/AdminDashboard/");
      if (currentUser === currentUser) {
        navigate("/");
      } else if (currentUser === currentUser.isSuperAdmin) {
        navigate("/SuperAdminDashboard/");
      } else {
        navigate("/AdminDashboard/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Connection</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Nom d'utilisateur"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          className="p-3 rounded-lg boder"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Connection"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 text-xl">
        <p>Vous n&apos;avez pas de compte?</p>
        <Link to="/signup">
          <span className="font-semibold text-blue-800 hover:underline">
            Inscrivez-vous
          </span>
        </Link>
      </div>
      {error && (
        <p className="mt-5 font-semibold text-center text-red-500">{error}</p>
      )}
    </div>
  );
};
