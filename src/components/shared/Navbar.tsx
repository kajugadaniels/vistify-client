import React from 'react'

const Navbar = () => {
    return (
        <div
        className="fixed top-0 left-0 w-full z-50 shadow-xl"
        style={{ height: `52px` }}
        >
            <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
                <div className="flex items-center gap-4 md:gap-6">
                    Navbar
                </div>
            </div>
        </div>
    )
}

export default Navbar