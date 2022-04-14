import {useState, ChangeEvent} from 'react';
import axios from 'axios';
import "../sass/register.scss";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export function Register() {
    interface InitialState{
        username:string,
        email:string,
        password:string
    };

    const initialState:InitialState = {
        username:"",
        email:"",
        password:""
    };

    const [state, setState] = useState<InitialState>(initialState);
    let {username, email, password} = state;

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
      }

      async function register(){
        try{
           const res = await axios.post("http://localhost:3004/api/v1/users",
            {
               username,
               email,
               password
            },
            {
                withCredentials:true
            })
           console.log(res.data);
           
        }catch(e){
            console.log(e)
        }
    }

    const navigate = useNavigate();

    function handleRegister(){
        register();
        setState(initialState);
        navigate("/login")
    }

  return (
    <div className="register__container">
        <div className="register__border">
        <h2>Register</h2>
        <label>
            Username:
            <input type="text" placeholder="username" name="username" onChange={handleChange}/>
        </label>
        <label>
            Email:
        <input type="text" placeholder="email" name="email" onChange={handleChange}/>
        </label>
        <label>
            Password:
        <input type="password" placeholder="password" name="password" onChange={handleChange}/>
        </label>
        <Button variant="contained" size="small" onClick={register}>register</Button>
        </div>
    </div>
  )
}

