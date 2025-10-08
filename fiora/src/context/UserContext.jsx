import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'


const UserContext = createContext()

 export function UserProvider({children}) {

const[user,setUser] = useState(null)

useEffect(() => {
    const storedUser =localStorage.getItem("loggedInUser");
    if(storedUser){
        setUser(JSON.parse(storedUser))
    }
},[])


const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser",JSON.stringify(userData))

}

const logout =() => {
    setUser(null);
    localStorage.removeItem("loggedInUser")
}

  return (

        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>

  )
}

export const useUser =() => useContext(UserContext)