import { useState, useEffect } from "react";
import { api } from "../utils";
import { Trash, Pencil, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/my-account");
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  

  const handleEdit = () => {
    setEditData({
      username: userData.username,
      email: userData.email,
    });
    setShowEditModal(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await api.put("/user/my-account", editData);
      if (response.status === 200) {
        setUserData(response.data);
        setShowEditModal(false);
      } else {
        console.error("Gagal menyimpan perubahan.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus akun ini?"
    );
    if (confirmDelete) {
      try {
        const response = await api.delete(`/user/${userData.id}`);
        if (response.status === 200) {
          localStorage.removeItem("userData");
          window.location.href = "/login";
        } else {
          console.error("Gagal menghapus akun");
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
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
          <img
            className="w-28 h-28 rounded-full"
            src="/image/carlos.jpg"
            alt="User"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Profil Pengguna</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {userData ? (
              <div>
                <p>
                  <strong>Nama Pengguna:</strong> {userData.username}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
              </div>
            ) : (
              <p>Tidak ada data pengguna yang ditemukan.</p>
            )}
          </div>
        )}
        <div className="mt-4">
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={handleDelete}
            >
                <Trash className="h-4 w-4 mr-2" /> Hapus
            </button>

          </div>
          <div className="flex justify-center mt-4">
            <NavLink to="/login">
              <LogOut className="h-4 w-4 mr-2" />
            </NavLink>
          </div>
        </div>
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Edit Profil</h3>
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
