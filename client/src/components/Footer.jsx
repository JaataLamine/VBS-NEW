import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="min-h-screen bg-crose font-montserrat">
      <div className="flex items-center justify-around">
        <div className="flex flex-col mt-10 text-center justify-items-center">
          <img
            src="images/signe.png"
            alt="logo"
            width={200}
            height={200}
            className="ml-10"
          />
          <h1 className="text-5xl font-bold text-gray-900">VOSBESOINS</h1>
          <h2 className="mt-3 text-lg font-bold text-gray-900 tracking-widestter">
            SERVICES
          </h2>
          <h5 className="mt-5 text-xs font-bold">VOS BESOINS NOS SERVICES</h5>
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
                <FontAwesomeIcon icon={faXTwitter} />
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
          Copyright © 2023 All Rights Reserved by Mame Bou FALL - and - Lamine B
          DIATTA
        </small>
      </div>
    </div>
  );
};
