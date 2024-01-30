import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  singInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export const SingIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Operations a effectuer pr se connecter
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
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
      dispatch(singInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Connection</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Nom d'utilisateur"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          className="boder p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Connection"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 text-xl">
        <p>Vous n'avez pas de compte?</p>
        <Link to="/signup">
          <span className="hover:underline font-semibold text-blue-800">
            Inscrivez-vous
          </span>
        </Link>
      </div>
      {error && (
        <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
      )}
    </div>
  );
};
