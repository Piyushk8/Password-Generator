import {useRef,useEffect, useCallback, useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [length,setlength]=useState([]);
 const [numberAllowed,setNumberAllowed]=useState(false);
 const [charAllowed,setCharAllowed]=useState(false);
const [Password,setPassowrd]=useState("");
//useref hook
const passwordRef=useRef(null)

const passwordGenerator = useCallback(()=>{
let pass=""
let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed) str+="0123456789";
if(charAllowed) str+="~!@#$%^&*()_+={}[]?"

for (let i=1;i<=length;i++){
  
  let char = Math.floor(Math.random()*str.length+1)
  pass += str.charAt(char)
}
setPassowrd(pass)

},[length,numberAllowed,charAllowed,setPassowrd]) 



useEffect(()=>{
passwordGenerator()
},[length,numberAllowed,charAllowed,setPassowrd,passwordGenerator])


const copyPasswordtoClipboard = useCallback(()=>{
window.navigator.clipboard.writeText(Password)
},[Password])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-7 '>
       <h1 className='text-white text-center'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        type="text"
        ref={passwordRef} />
        <button 
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordtoClipboard}>
        
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer'
          onChange={(e)=>{
              setlength(e.target.value)
          }} />
        <label> Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          id='numberInput'
          onChange={(e)=>{    
                setNumberAllowed((prev)=> !prev);

          }} />
        <label >Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          id='charInput'
          onChange={(e)=>{    
                setCharAllowed((prev)=> !prev);

          }} />
        <label>Characters</label>
        </div>

      </div>
    </div>

    </>
  )
}

export default App
