const Logout = () => {
    const token = localStorage.getItem('token')

    if(!token) {
        window.location.href = '/'
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
    <>
        <div className="">
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-4 rounded">Logout</button>
        </div>
    </>
    )
}

export default Logout