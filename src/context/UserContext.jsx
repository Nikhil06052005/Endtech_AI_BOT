import React, { createContext } from 'react'
export const dataContext = createContext()
function UserContext({children}) {
    let [startRes,setStartRes] = React.useState(false)
    let [popUp,setPopUp]= React.useState(false)
    let value = {
        startRes,
        setStartRes,
        popUp,
        setPopUp
    }
  return (
    <div>
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
    </div>
  )
}

export default UserContext
