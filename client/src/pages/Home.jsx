import { Footer } from "../components/Footer";
import { Services } from "../components/Services";

export const Home = () => {
  return (
    <>
      <div className="relative flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="inset-y-0 top-0 right-0 z-0 max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          {/* <svg
            className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block -z-0"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg> */}
          <img
            className="object-cover h-56 rounded w-full shadow-lg lg:rounded-none
          lg:shadow-none md:h-96 lg:h-full"
            src="http://localhost:5173/images/banner.jpg"
            alt="work"
          />
        </div>
        <div className="relative flex flex-col w-full items-start max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl lg:col-span-2">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <h1 className="mb-5 font-montserrat text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl leading-10">
              Trouver une personne qualifiee
              <br className="hidden md:block" />
              ideale pour tous vos services du{" "}
              <span className="inline-block text-slate-700">quotidien</span>
            </h1>
            <div className="flex items-center">
              <a
                href="/"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-slate-700 hover:opacity-90 focus:shadow-outline focus:outline-none"
              >
                Trouver un prestataire
              </a>
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
