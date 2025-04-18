const Home = () => {
  return (
    <>
      <section
        id="home"
        className="h-screen bg-slate-900 text-slate-100 items-center justify-center"
      >
        <h2 className="text-8xl font-semibold pt-20 mt-18 pl-6 max-w-5xl ml-6">
          Where Bold <span className="text-indigo-200">Ideas</span> Meet Bold <span className="text-indigo-200">Investors...</span>
        </h2>
        <p className="text-2xl mr-8px font-medium pt-6 pl-14 max-w-2xl">Launchpad helps startups and investors grow together.</p>
        <div className="pt-6 pl-14">
          <button className="text-2xl bg-indigo-400 text-slate-900 font-bold px-6 py-4 rounded mr-4 hover:bg-green-600 transition-colors duration-500">
            Raise Funds
          </button>
          <button className="text-2xl bg-indigo-400 text-slate-900 font-bold px-6 py-4 rounded hover:bg-green-600 transition-colors duration-500">
            Explore Startups
          </button>
        </div>
      </section>

      <section
        id="about"
        className="h-screen bg-slate-50 text-slate-800 flex items-center justify-center"
      >
        <p className="text-2xl text-red-800">
          This is the about section with a different color
        </p>
      </section>
    </>
  );
};

export default Home;

