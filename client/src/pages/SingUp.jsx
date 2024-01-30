import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  singInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export const SingUp = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Operations a effectuer pr la creation de compte
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(singInSuccess(data));
      navigate("/signin");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-3xl text-center font-semibold my-7">Inscription</h1>
        <input
          type="text"
          id="username"
          placeholder="Nom d'utilisateur"
          className="boder p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          className="boder p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="address"
          placeholder="Adresse domicile"
          className="boder p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="number"
          id="phone"
          placeholder="Numero de telephone"
          className="boder p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Inscription"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 text-xl">
        <p>Vous avez deja un compte?</p>
        <Link to="/signin">
          <span className="hover:underline font-semibold text-blue-800">
            Connectez-vous
          </span>
        </Link>
      </div>
      {error && (
        <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
      )}
    </div>
  );
};
