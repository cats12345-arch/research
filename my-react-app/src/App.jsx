import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [result, setResult] = useState("");

  const onSubmitSignIn = async(e) => {
        e.preventDefault();
        setResult("Sending");

        const formData = new FormData(e.target);
        console.log(...formData);

        const username = formData.get("username");
        const password = formData.get("password");

        console.log("Username:", username);

        const response = await fetch(`http://localhost:3001/api/auth/login`, {
            method:"Post",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({username, password})
        });


        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Response:", data);


        if(response.status === 200) {
            setResult("Sign In successful");
            e.target.reset();
        } else {
            setResult("Could not sign in");
        }
    }

    const onSubmitSignUp = async(e) => {
        e.preventDefault();
        setResult("Sending");

        const formData = new FormData(e.target);
        console.log(...formData);

        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");

        console.log("Username:", username);

        const response = await fetch(`http://localhost:3001/api/auth/signup`, {
            method:"Post",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({username, password, email})
        });

        if(response.status === 201) {
            setResult("Sign Up successful");
            e.target.reset();
        } else {
            setResult("Could not sign in");
        }
    }

  return (
    <>
      <p>Test</p>
      <p>{result}</p>
      <div>
        <div>
          <p>Sign in</p>
          <form id='signIn' onSubmit={onSubmitSignIn}>
            <input type="text" id="username" name="username" placeholder='Username'></input>
            <input type="text" id="password" name="password" placeholder='password'></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <p>Sign Up</p>
          <form id='signIn' onSubmit={onSubmitSignUp}>
            <input type="text" id="username" name="username" placeholder='Username'></input>
            <input type="text" id="password" name="password" placeholder='password'></input>
            <input type="text" id="email" name="email" placeholder='email'></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
