// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"; // Mengimpor useEffect
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [kategori, setKategori] = useState([]); // Menambahkan state untuk kategori

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories") // Mengambil data kategori dari API
      .then((res) => res.json())
      .then((json) => setKategori(json)) // Menyimpan data kategori ke state
      .catch((error) => console.error("Error fetching categories:", error)); // Menangani kesalahan jika pengambilan data gagal
  }, []); // useEffect dijalankan sekali saat komponen di-mount

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full h-14 bg-green-800">
      <div className="flex justify-between">
        <div className="flex p-3 h-14">
          <Link to="/" className="text-white font-bold">
            Lingga Shop
          </Link>
        </div>
        <div className="flex p-3 gap-4 h-14">
          <Link to="/" className="text-white font-bold">
            Home
          </Link>
          <Link to="/about" className="text-white font-bold">
            About
          </Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-white font-bold flex">
              Kategori
              <img
                src="./svg/down.svg"
                className={isDropdownOpen ? "rotate-180" : ""}
              />
            </button>
            {isDropdownOpen && ( // Menampilkan dropdown saat isDropdownOpen true
              <div className="absolute top-full left-0 bg-white shadow-lg">
                {kategori.map(
                  (
                    item // Menggunakan map untuk membuat daftar kategori
                  ) => (
                    <Link
                      key={item} // Menambahkan key unik untuk setiap item kategori
                      to={`/category/${item}`} // Membuat link dinamis berdasarkan item kategori
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      {/* Mengubah huruf pertama kategori menjadi huruf besar dan slice untuk memotong kata */}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
