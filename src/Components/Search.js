import { useCombobox } from "downshift"
import React, { useEffect, useState } from "react"

export const Search =()=> {
  const [inputItems, setInputItems] = useState([])
  const [users, setUsers] = useState([])
  const [allSingleUserData, setAllSingleUserData] = useState("")
  const [text, setText] = useState("")
  const usersDirect = users.map((e)=> e.data)

  useEffect(() => {
    fetch("http://localhost:3000/comments/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
  }, [])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        usersDirect.filter((item) =>
          item.firstName.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })

  return (
    <div className='row'>
      <h4>Search and View User Data by First Name</h4>
      <div {...getComboboxProps()}> 
      <div className="input-field inline">
        <input {...getInputProps()} name='search' placeholder='Search'/>
        </div>  
      </div>
              <ul {...getMenuProps()}>{isOpen && inputItems.map((item, index) => (
                    <span key={item.DoB} {...getItemProps({ item, index })} 
                          onClick={() => {setAllSingleUserData(item); setText('Captured Information from Data Base: ')}}>
                      <li style={highlightedIndex === index ? { background: "#ede" } : {}}>
                        <p>{item.firstName}</p>
                      </li>
                    </span>
                    ))}
              </ul>
          <h5>{text}</h5> 
          <p> ---{Object.entries(allSingleUserData).join(', ')}---</p>
    </div>
  )
}

