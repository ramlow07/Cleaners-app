import { useState } from "react";

const CleanerProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "Luam Ramlow",
    email: "luam@example.com",
    bio: "Full-Stack Developer | Passionate about Clean Code and UI/UX",
  });

  const handleEditToggle = () => setEditMode(!editMode);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <div className="flex flex-col items-center gap-4">
          {/* User Details */}
          {editMode ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none focus:border-green-500"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-green-900">
              {user.name}
            </h2>
          )}
          <p className="text-gray-500">{user.email}</p>

          {editMode ? (
            <textarea
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
            />
          ) : (
            <p className="text-gray-600 text-center max-w-lg">{user.bio}</p>
          )}

          {/* Buttons */}
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CleanerProfile;
