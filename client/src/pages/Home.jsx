import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Services } from "../components/Services";

export const Home = () => {
  return (
    <>
      <div className="relative grid flex-col-reverse grid-cols-1 gap-4 py-16 lg:pt-0 lg:flex-col lg:pb-0 lg:grid-cols-3 lg:gap-8">
        <div className="inset-y-0 right-0 z-0 px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:max-w-full lg:absolute xl:px-0">
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src="http://localhost:5173/images/banner.jpg"
            alt="work"
          />
        </div>
        <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl lg:col-span-2">
          <div className="mb-16 ml-16 lg:my-40 lg:max-w-full lg:pr-5">
            <h1 className="mb-5 text-3xl font-bold leading-10 tracking-tight text-gray-900 font-montserrat sm:text-3xl mx-w-full">
              Trouver une personne qualifiee
              <br className="hidden md:block" />
              ideale pour tous vos services du
              <br className="hidden md:block" />
              <span className="inline-block text-slate-700">quotidien</span>
            </h1>
            <div className="flex items-center">
              <Link
                to="/FaireDemande"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-slate-700 hover:opacity-90 focus:shadow-outline focus:outline-none"
              >
                Trouver un prestataire
              </Link>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-slate-700"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <Footer />
    </>
  );
};
