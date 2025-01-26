function HomePage() {
  return (
    <div className="main-container flex flex-col items-center justify-center h-screen bg-gray-400">
      <div className="features flex flex-col items-center justify-center h-32 bg-blue-400 p-4 rounded-md shadow-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
        <ul className="list-disc list-inside">
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Node.js</li>
        </ul>
      </div>
      <div className="author flex flex-col items-center justify-center h-24 bg-green-400 p-4 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-2">About the Creator</h2>
        <p>Created by Luam Ramlow, Full-Stack Developer.</p>
      </div>
    </div>
  );
}

export default HomePage;
