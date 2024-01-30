import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";

export const Profile = () => {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          id="username"
          defaultValue={user.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Votre adresse"
          id="address"
          defaultValue={user.address}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Numero de telephone"
          id="phone"
          defaultValue={user.phone}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Mise a jour"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className=" text-red-700 cursor-pointer  font-semibold"
        >
          Supprimer votre compte
        </span>
        <span
          onClick={handleSignOut}
          className=" text-red-700 cursor-pointer  font-semibold"
        >
          Deconnectez-vous
        </span>
      </div>
      {error && (
        <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
      )}
      {updateSuccess && (
        <p className="text-green-700 mt-5 text-center font-semibold">
          Mise a jour bien effectuee
        </p>
      )}
    </div>
  );
};
