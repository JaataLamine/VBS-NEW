import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-crose min-h-screen font-montserrat">
      <div className="flex justify-around items-center">
        <div className="flex flex-col justify-items-center text-center mt-10">
          <img
            src="images/signe.png"
            alt="logo"
            width={200}
            height={200}
            className="ml-10"
          />
          <h1 className="text-5xl font-bold text-gray-900">VOSBESOINS</h1>
          <h2 className="text-lg tracking-widestter font-bold text-gray-900 mt-3">
            SERVICES
          </h2>
          <h5 className="text-xs font-bold mt-5">VOS BESOINS NOS SERVICES</h5>
        </div>
        <div className="">
          <ul className="flex flex-col gap-8 text-cvert">
            <Link to="/FaireDemande">
              <li className="hover:underline">Demander un service</li>
            </Link>
            <Link to="/CreatePrestataire">
              <li className="hover:underline">Trouver un travail</li>
            </Link>
            <Link to="/signin">
              <li className="hover:underline">Connection</li>
            </Link>
            <Link to="/signup">
              <li className="hover:underline">Inscrivez-vous</li>
            </Link>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-7">
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faSquareInstagram} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-end pt-64">
        <small className="">
          Copyright © 2023 All Rights Reserved by Mame Bou FALL
        </small>
      </div>
    </div>
  );
};
