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
    <div>
      <input
        type="text"
        placeholder="Search cleaners..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredCleaners.map((cleaner) => (
          <li key={cleaner.id}>{cleaner.name}</li>
        ))}
      </ul>
    </div>
  );
}
