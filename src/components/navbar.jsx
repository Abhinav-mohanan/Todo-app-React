import React from "react";
export const Navbar = () =>{
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <h1 className="text-xl font-bold">My To-Do</h1>
            <div className="space-x-7">
                <span className="hover:text-blue-400 cursor-pointer mr-[50px]">Home</span>
                <span className="hover:text-blue-400 cursor-pointer mr-[50px]">Todos</span>
            </div>
        </nav>
    )
}