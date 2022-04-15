import "../sass/navbar.scss";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import Button from '@mui/material/Button';


type Props = {
  user: any;
  off: boolean;
  setOff: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwitch: () => void;
};

export function Navbar({ user, handleSwitch }: Props) {

  const navigate = useNavigate();

  async function logout() {
    try {
      const res = await axios.post(
        "http://localhost:3004/api/v1/users/logout",
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <nav>
        <div className="nav__icon" onClick={handleSwitch} style={{cursor:"pointer"}}>
        <CategoryTwoToneIcon style={{ fontSize: 40, color: "#0e68a3" }} />
        </div>
        <div className="nav__appname" onClick={() => navigate("/")} style={{cursor:"pointer"}}>Ordergoat</div>
        <ul>
          {user && <li><Button variant="outlined" style ={{marginTop:4}}>logged in as {user.username}</Button></li>}
          {user && <Button size="small"
           variant = "contained" 
           style ={{marginRight:10, marginTop:4}}
           onClick={handleLogout}>logout</Button>}
          </ul>
      </nav>
      <Outlet />
    </>
  );
}
