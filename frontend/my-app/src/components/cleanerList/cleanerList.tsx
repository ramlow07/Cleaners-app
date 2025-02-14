import { useState, useEffect } from "react";

type CleanerType = {
  id: string;
  name: string;
};

export default function CleanerList() {
  const [cleaner, setCleaners] = useState<CleanerType[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCleaners = async () => {
      try {
        const res = await fetch("http://localhost:8080/cleaners");
        const cleanersData: CleanerType[] = await res.json();
        setCleaners(cleanersData);
      } catch (error) {
        console.error("Error fetching cleaners.", error);
      }
    };

    fetchCleaners();
  });

  const filteredCleaners = cleaner.filter((cleaner) =>
    cleaner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-6">
        <input
          type="text"
          placeholder="Search cleaners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
      </div>

      {/* Cleaners Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCleaners.map((cleaner) => (
          <div
            key={cleaner.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <h2 className="text-xl font-semibold">{cleaner.name}</h2>

            {/* Contact Button */}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Contact Cleaner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
