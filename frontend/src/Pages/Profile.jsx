import { useState, useEffect } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from backend endpoint
        fetch('/api/v1/profile')
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    // Function to handle edit action
    const handleEdit = () => {
        // Implement edit functionality here
        console.log('Edit action');
    };

    // Function to handle delete action
    const handleDelete = () => {
        // Display confirmation dialog
        const confirmDelete = window.confirm('Anda yakin ingin menghapus akun ini?');
        if (confirmDelete) {
            // Send delete request to backend
            fetch('/api/v1/profile', {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Logout user
                    // Implement logout functionality here
                    console.log('User berhasil dihapus');
                } else {
                    console.error('Gagal menghapus akun');
                }
            })
            .catch(error => {
                console.error('Error deleting user account:', error);
            });
        }
    };

    return (
        <div className="relative bg-gray-100 min-h-screen flex items-center justify-center">
            <img src="/image/bg.jpg" alt="bg" className="absolute inset-0 object-cover w-full h-full z-0" />
            <div className="z-10 bg-white bg-opacity-75 p-8 rounded-lg shadow-md flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    {/* Display user image here */}
                    <img className="w-28 h-28 rounded-full" src="/image/carlos.jpg" alt="User" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Profil Pengguna</h2>
                {userData ? (
                    <div>
                        <p><strong>Nama Pengguna:</strong> {userData.nama_pengguna}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="mt-4 space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Hapus</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
