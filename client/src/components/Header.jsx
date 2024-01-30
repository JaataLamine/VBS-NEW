import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

export const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserSuccess(error.message));
    }
  };

  return (
    <header className="bg-crose shadow-md">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link to="/" className="inline-flex items-center">
            <img
              src="http://localhost:5173/images/signe.png"
              alt="logo"
              width={50}
              height={40}
            />
            <span className="ml-2 text-xl font-bold tracking-wide text-slate-900 uppercase">
              BESOINS SERVICES
            </span>
          </Link>
          <ul className="flex items-center space-x-8 lg:flex md:inline-flex">
            <Link to="/FaireDemande">
              <li className="font-medium tracking-wide text-slate-900">
                Demander un service
              </li>
            </Link>
            <Link to="/CreatePrestataire">
              <li className="font-medium tracking-wide text-slate-900 btn btn-sm btn-link">
                Trouver un travail
              </li>
            </Link>
            {user ? (
              <>
                {user.isSuperAdmin ? (
                  <>
                    <Link to="/PendingPrestataire">
                      <li className="font-medium tracking-wide text-slate-900 btn btn-sm btn-link">
                        Prestataires
                      </li>
                    </Link>
                    <Link to="/CreatePrestataire">
                      <li className="font-medium tracking-wide text-slate-900">
                        Creer un service
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )}
                <Link to="/Profile" className="font-bold">
                  <li className="relative inline-flex items-center justify-center w-full h-10 px-3 py-7 overflow-hidden bg-gray-100 rounded-full shadow-xl hover:bg-slate-700 hover:text-gray-100">
                    <span className="font-medium">{user.username}</span>
                  </li>
                </Link>
                <Link onClick={signout}>
                  <li className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-lg bg-slate-700 hover:opacity-90 focus:shadow-outline focus:outline-none">
                    Deconnection
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/SignIn">
                  <li className="font-medium tracking-wide text-white transition-colors duration-200 inline-flex items-center justify-center h-12 px-6 tracking-wide rounded shadow-md bg-slate-700 hover:opacity-90 focus:shadow-outline focus:outline-none">
                    Connection
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
