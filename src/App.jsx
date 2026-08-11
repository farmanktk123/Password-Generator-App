import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState("");

  const [lenght, setLenght] = useState(8);
  const [Numbers,setNumbers] = useState(false);
  const [Char,setCharacters] = useState(false);
  const [copied, setCopied] = useState(false);

  // USEREF Hook

  const pswdRef = useRef(null);
  
  const generatePassword = useCallback(() => {
    let newpswd = "";

    let AllCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(Numbers) AllCharacters += "0123456789";
    if(Char) AllCharacters += "!@#$%^&*()";

          for(let i = 0; i<lenght; i++)
          {
            const pswdindx = Math.floor(
              Math.random() * AllCharacters.length
            )

            newpswd += AllCharacters[pswdindx]
          }

          setPassword(newpswd);


  }, [lenght,Numbers,Char,setPassword])



const copyPassword = useCallback(() => {
  pswdRef.current?.select();
navigator.clipboard.writeText(password);

setCopied(true);
setTimeout(() =>
{
  setCopied(false);
},2000)

},[password])


  //   Button Clicked Using USEEFFECT Method

useEffect(() => {
  generatePassword();
},[lenght,Numbers,Char])     

  return (
    <div className='main-dev'>
      <div className="pswd-container">
        <h3 id='main-heading'>Generate Random Password</h3> <br />

        <p id='labeltext'>Input Password</p>

        <div className="wrapperdev">

          <input type="text" id='input-pswd' value={password} readOnly 
          ref={pswdRef}/>


        <div className="copy-container">
          {copied && <span className="copied-msg">✅ Copied!</span>}

          <button id="copybtn" onClick={copyPassword}>
            Copy
          </button>
        </div>

        </div>

        <div className="descdev">
          <input type="range" min={8} max={100} value={lenght}
          onChange={(e) => {
            setLenght(e.target.value)
          }}
         
          />Length: {lenght}
          <input onClick={generatePassword} type="checkbox" name="Numbers" id="" />Numbers
          <input onClick={generatePassword} type="checkbox" name="Characters" id="" />Characters

        </div>


            {/* // Button Clicked Using Onclick() Method */}


        <button onClick={generatePassword}>generate Password</button><br />
      </div>


     

    </div>
  )
}

export default App
