import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'



const UserContext = createContext()

 export function UserProvider({children}) {


    
const[user,setUser] = useState(null)
const [error,setError] = useState("")
 

useEffect(() => {
    const storedUser =localStorage.getItem("currentUser");
    if(storedUser){
        setUser(JSON.parse(storedUser))
    }
},[])


const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser",JSON.stringify(userData))
}




const register = async (userData) => {
    setError('')

try{
    const res = await axios.get(`http://localhost:5000/users?email=${userData.email}`);
      if (res.data.length > 0) {
        setError("Account already exists");
        alert("Account already exists!");
        return null;
    }

const usersResponse = await axios.get('http://localhost:5000/users')
const  users = usersResponse.data

const newUser ={
    ...userData,
    cart:[],
    wishlist:[],
    orders:[]
}

const response = await axios.post('http://localhost:5000/users',newUser)
setUser(response.data)
localStorage.setItem("currentUser",JSON.stringify(response.data))
setError('')
return response.data

}catch(error){
    setError("registration failed.please try again")
    return null

}

}



const logout =() => {
    setUser(null);
    localStorage.removeItem("currentUser")
}



  return (

        <UserContext.Provider value={{user,setUser,login,logout,register,error}}>
            {children}
        </UserContext.Provider>

  )
}

export const useUser =() => useContext(UserContext)