// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const Login = () => {
  document.title = "Login";

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [toggle, setToggle] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    // Mengambil data username dan password dari localStorage saat pertama kali halaman di render
    const savedUsername = localStorage.getItem("username");
    const savedPasswordEncrypted = localStorage.getItem("password");

    if (savedUsername && savedPasswordEncrypted) {
      // eslint-disable-next-line no-undef
      const bytes = CryptoJS.AES.decrypt(
        savedPasswordEncrypted,
        "secret key 123"
      ); //untuk mendekripsi password dari localStorage
      // eslint-disable-next-line no-undef
      const savedPassword = bytes.toString(CryptoJS.enc.Utf8); //untuk mengkonversi password kedalam bentuk string

      setusername(savedUsername);
      setPassword(savedPassword);
      setToggle(true);
    }
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json()) // Convert response ke JSON
      .then((json) => {
        setUser(json); //ambil data dari JSON dan simpan dalam function setUser
        if (json.token) {
          // Minta token jika login sukses
          localStorage.setItem("token", json.token); // Simpan token ke localStorage
          if (toggle) {
            // eslint-disable-next-line no-undef
            const passwordEncrypted = CryptoJS.AES.encrypt(
              password,
              "secret key 123"
            ).toString();
            localStorage.setItem("username", username);
            localStorage.setItem("password", passwordEncrypted);
          } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
          }
          alert("Login berhasil");
          window.location.href = "/product";
        } else {
          alert("Login gagal, silakan periksa kredensial Anda.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Terjadi kesalahan, silakan coba lagi nanti.");
      });
  };

  return (
    <div className="login">
      <div className="p-10 bg-gray-200 max-w-96 rounded-xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center p-5">Login</h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="UwO2Vasdnas"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type={showPass ? "text" : "password"}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 mb-5">
            <input
              type="checkbox"
              checked={showPass}
              onChange={handleShowPass}
            />
            <h1>Show Password</h1>
          </div>
          <div className="flex gap-2 mb-5">
            <input type="checkbox" checked={toggle} onChange={handleToggle} />
            <h1>Remember Me</h1>
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
