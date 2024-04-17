import { useState, useEffect } from "react";
import { api } from "../utils";
import { Trash, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus akun ini?"
    );
    if (confirmDelete) {
      try {
        const response = await api.delete(`/user/${userData.id}`);
        if (response.status === 200) {
          localStorage.removeItem("userData");
          alert("Akun berhasil dihapus.");
          // Navigasi ke halaman login menggunakan NavLink
        } else {
          console.error("Gagal menghapus akun");
          alert("Terjadi kesalahan saat menghapus akun.");
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
        alert("Terjadi kesalahan saat menghapus akun.");
      }
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen flex items-center justify-center">
      <img
        src="/public/image/bg.jpg"
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
                  <strong>Username:</strong> {userData.username}
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
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4 mr-2" /> Hapus
          </button>
          <div className="flex justify-center mt-4">
            {/* Gunakan NavLink untuk navigasi ke halaman login setelah menghapus akun */}
            <NavLink to="/login">
              <LogOut className="h-4 w-4 mr-2" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
