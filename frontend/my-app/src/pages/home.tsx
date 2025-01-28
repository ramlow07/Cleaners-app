import React from "react";
const HomePage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="hero text-center px-4">
        <h1 className="text-black text-xl mb-2 font-bold">
          Para economizar tempo, vá de FAXINEI.
        </h1>
        <p className="mb-4">Sua salvação para os dias de correria.</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white rounded-3xl hover:bg-blue-300 shadow-md transition">
            Quero contratar uma colaboradora.
          </button>
          <button className="bg-white rounded-3xl hover:bg-blue-300 shadow-md transition">
            Quero oferecer meu serviço
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
