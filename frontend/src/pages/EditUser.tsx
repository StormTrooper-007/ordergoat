import { Button } from "@mui/material";
import { Shadow } from "../components/Shadow";
import { Sidebar } from "../components/Sidebar";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import "../sass/edituser.scss";
import { useParams } from "react-router-dom";
import {ToggleAdmin} from "../components/ToggleAdmin";

type Props = {
  off: boolean;
  setOff: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwitch: () => void;
};

export function EditUser({ off, handleSwitch }: Props) {
  interface InitialState {
    username: string;
    email: string;
  }


  const initialState: InitialState = {
    username: "",
    email: "",
  };

  const [state, setState] = useState<InitialState>(initialState);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  let { username, email} = state;

  function handleToggle(){
    setIsAdmin((prev) => !prev)
    console.log(isAdmin)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    if (userId) {
      getSingleUser(userId);
    }
  }, [userId]);

  async function getSingleUser(userId: string) {
    const res = await axios.get(
      `http://localhost:3004/api/v1/users/${userId}`,
      { withCredentials: true }
    );
    setState({ ...res.data });
  }

  async function updateUser(userId: string) {
    try {
      const res = await axios.put(
        `http://localhost:3004/api/v1/users/${userId}`,
        { email, username, isAdmin },
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="edituser__container">
      <div className="register__border">
        <h2>Update user</h2>
        <label>
          Username:
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label>
          Toggle admin role
          <ToggleAdmin handleToggle ={handleToggle} isAdmin={isAdmin}/>
        </label>
        <Button
          variant="contained"
          size="small"
          onClick={() => updateUser(`${userId}`)}
        >
          {" "}
          Update User{" "}
        </Button>
      </div>
    </div>
  );
}
