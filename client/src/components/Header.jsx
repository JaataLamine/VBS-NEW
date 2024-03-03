import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
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

  const toggleMenu = () => {
    const hamburger = document.querySelector("#hamburger");
    const menu = document.querySelector("#menu");

    hamburger.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  };

  return (
    <nav className="fixed top-0 z-20 w-full shadow-md bg-crose">
      <div className="container flex items-center justify-between px-4 py-5 mx-auto">
        {/* <div className="relative items-center hidden md:flex"> */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex flex-col items-center md:flex lg:flex-row md:flex-row"
          >
            <img
              src="http://localhost:5173/images/signe.png"
              alt="logo"
              className="w-9 h-8 md:w-[50px] md:h-10"
            />
            <span className="ml-2 text-xs font-bold md:text-xl text-slate-900">
              BESOINS SERVICES
            </span>
          </Link>
        </div>
        <ul className="items-center hidden space-x-8 md:flex lg:flex">
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
          {currentUser ? (
            <>
              {currentUser.isSuperAdmin ? (
                <>
                  <Link to="/PendingPrestataire">
                    <li className="font-medium tracking-wide text-slate-900 btn btn-sm btn-link">
                      Prestataires
                    </li>
                  </Link>
                  <Link to="/CreateService">
                    <li className="font-medium tracking-wide text-slate-900">
                      Creer un service
                    </li>
                  </Link>
                </>
              ) : (
                ""
              )}
              <Link to="/Profile" className="font-bold">
                <li className="relative inline-flex items-center justify-center w-full h-10 px-3 overflow-hidden bg-gray-100 rounded-full shadow-xl py-7 hover:bg-slate-700 hover:text-gray-100">
                  <span className="font-medium">{currentUser.username}</span>
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
                <li className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition-colors duration-200 rounded shadow-md bg-slate-700 hover:opacity-90 focus:shadow-outline focus:outline-none">
                  Connection
                </li>
              </Link>
            </>
          )}
        </ul>
        {/* </div> */}
        {/* Hamburger Menu */}
        <div
          id="hamburger"
          className="z-20 space-y-1 cursor-pointer md:hidden"
          onClick={toggleMenu}
        >
          <div className="w-6 h-1 bg-black"></div>
          <div className="w-6 h-1 bg-black"></div>
          <div className="w-6 h-1 bg-black"></div>
        </div>
        {/* Menu Responsive */}
        <ul
          id="menu"
          className="absolute top-0 left-0 hidden w-full p-6 text-center shadow-md md:hidden bg-crose rounded-b-xl"
        >
          <Link to="/FaireDemande">
            <li className="py-3">Demander un service</li>
          </Link>
          <Link to="/CreatePrestataire">
            <li className="py-3">Trouver un travail</li>
          </Link>
          {currentUser ? (
            <>
              {currentUser.isSuperAdmin ? (
                <>
                  <Link to="/PendingPrestataire">
                    <li className="py-3">Prestataires</li>
                  </Link>
                  <Link to="/CreateService">
                    <li className="py-3">Creer un service</li>
                  </Link>
                </>
              ) : (
                ""
              )}
              <Link to="/Profile" className="font-bold">
                <li className="py-3">
                  <span className="font-medium">{currentUser.username}</span>
                </li>
              </Link>
              <Link onClick={signout}>
                <li className="py-3">Deconnection</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/SignIn">
                <li className="py-3">Connection</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
