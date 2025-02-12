import { useState, useEffect } from "react";

export default function CleanerList() {
  const [cleaner, setCleaners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/cleaners")
      .then((res) => res.json())
      .then((data) => setCleaners(data))
      .catch((error) => console.error("Error fetching cleaners", error));
  }, []);
}
