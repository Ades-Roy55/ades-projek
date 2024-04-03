import { useState, useEffect } from "react";
import { api } from "../utils";
import { Trash, Pencil, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    api.get("/user/my-account").then((res) => setUserData(res.data));
  }, []);

  // Function to handle edit action
  const handleEdit = () => {
    console.log("Edit action");
  };

  // Function to handle logout action
  const handleLogout = () => {
    // Display confirmation dialog
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin logout?"
    );
    if (confirmLogout) {
      localStorage.removeItem("userData");
      // Redirect to login page
      history.push("/login");
    }
  };

  // Function to handle delete action
  const handleDelete = () => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus akun ini?"
    );
    if (confirmDelete) {
      // Send delete request to backend
      api.delete("/user/my-account")
        .then((response) => {
          if (response.status === 200) {
            // Logout user
            handleLogout();
          } else {
            console.error("Gagal menghapus akun");
          }
        })
        .catch((error) => {
          console.error("Error deleting user account:", error);
        });
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen flex items-center justify-center">
      <img
        src="/image/bg.jpg"
        alt="bg"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      <div className="z-10 bg-white bg-opacity-75 p-8 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          {/* Display user image here */}
          <img
            className="w-28 h-28 rounded-full"
            src="/image/carlos.jpg"
            alt="User"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Profil Pengguna</h2>
        {userData ? (
          <div>
            <p>
              <strong>Nama Pengguna:</strong> {userData.nama_pengguna}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-4">
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" /> Hapus
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <NavLink to='/login'>
              <LogOut className="h-4 w-4 mr-2" /> 
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
