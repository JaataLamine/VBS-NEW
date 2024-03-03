import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  // faXTwitter,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="min-h-[500px] bg-crose font-montserrat">
      <div className="flex justify-around pt-20">
        <div className="flex flex-col text-center justify-items-center">
          <img
            src="images/signe.png"
            alt="logo"
            width={100}
            height={100}
            className="m-auto"
          />
          <h1 className="text-2xl font-bold text-gray-900">VOSBESOINS</h1>
          <h2 className="mt-1 text-lg font-bold text-gray-900 tracking-widestter">
            SERVICES
          </h2>
          <h5 className="mt-1 font-bold text-[8px]">
            VOS BESOINS NOS SERVICES
          </h5>
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
              <a href="mailto:vosbesoinsservices@gmail.com">
                vosbesoinsservices@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:776806767">+221 77 680 67 67</a>
            </li>
            <li>
              <a href="tel:761752034">+221 76 175 20 34</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex pt-40 pl-20 gap-7">
        <span className="pr-5 border-r-2 border-slate-950">Suivez-nous</span>
        <ul className="flex gap-7">
          <li>
            <a href="https://www.facebook.com/besoins.services/">
              <FontAwesomeIcon className="h-5" icon={faFacebook} />
            </a>
          </li>
          {/* <li>
              <a href="#">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </li> */}
          <li>
            <a href="https://www.instagram.com/besoins.services/">
              <FontAwesomeIcon className="h-5" icon={faSquareInstagram} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon className="h-5" icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </div>
      <div className="flex pt-10 pl-20">
        <small>
          Copyright © 2023 All Rights Reserved by Mame Bou FALL - and - Lamine B
          DIATTA
        </small>
      </div>
    </div>
  );
};
