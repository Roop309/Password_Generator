import { useCallback, useEffect, useRef, useState } from 'react'
 
import './App.css'

function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumber] = useState(false)
  const [charAllowed, setChar] =useState(false)
  const [password, setPassword] = useState("")

  //useRef Hooks
  const Refpassword = useRef(null)

  const passwordGenerator= useCallback(() =>{
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*=+(){}[]~`/|"
    for (let i = 1; i <= length; i++) {
      
    let ramchar =Math.floor (Math.random() * str.length+1)
    pass += str.charAt(ramchar)
      
    }
    setPassword(pass)

  }, [length , numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard= useCallback(() => {
    Refpassword.current?.select();
    Refpassword.current?.setSetectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  } ,[password])

  useEffect(() =>{
    passwordGenerator()
  } ,[ length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>

<div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: `url('https://i0.wp.com/whatismyip.network/wp-content/uploads/2019/09/Strong-Password-Generator.jpg?fit=1280%2C721&ssl=1')`,
    }}
        >

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-12 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-4' 
         placeholder='password' 
         readOnly
         ref={Refpassword}/>
         
         <button 
         onClick={copyPasswordToClipboard}
         className='text-white outline-none bg-blue-700 px-4 py-0.5 shrink-0 hover:bg-sky-700'>Copy</button>
      </div>
      <div className='flex gap-x-2 text-sm'> 
        <div className='flex items-center gap-x-1'> 
          <input 
          type="range"
          min={6}
          max={100}
          className='cursor-pointer'
          onClick={(e) =>{setLength(e.target.value)}} />
          <label>Length:  {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={numberAllowed}
           id='numberinput'
           onChange={() => {
            setNumber((prev) => !prev)
           }}
            />
            <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={charAllowed}
           id='charinput'
           onChange={() => {
            setChar((prev) => !prev)
           }}
            />
            <label htmlFor="stringInput">String</label>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
