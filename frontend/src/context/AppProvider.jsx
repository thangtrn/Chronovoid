import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const initialData = {
   _id: "US001",
   name: "Admin",
   image: "https://us.123rf.com/450wm/sternfahrer/sternfahrer2210/sternfahrer221000095/192283932-cat-avatar-illustration-with-blue-background-concept.jpg",
   role: "admin",
   email: "admin@gmail.com",
   password: "123456",
   __v: 0
}

const AppProvider = ({ children }) => {
   const [auth, setAuth] = useState(() => {
      return JSON.parse(localStorage.getItem('auth'));
   });

   return (
      <AppContext.Provider value={{ auth, setAuth }}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider