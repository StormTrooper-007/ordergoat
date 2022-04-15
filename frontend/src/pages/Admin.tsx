import "../sass/admin.scss";
import axios from "axios";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shadow } from "../components/Shadow";
import { Sidebar } from "../components/Sidebar";

type Props = {
  off: boolean;
  setOff: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwitch: () => void;
};

export function Admin({ off, handleSwitch }: Props) {
  const [users, setUsers] = useState<any[]>([]);


  async function getAllusers() {
    try {
      const res = await axios.get("http://localhost:3004/api/v1/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllusers();
  }, []);

  async function deleteUser(id: string) {
    const res = await axios.delete(`http://localhost:3004/api/v1/users/${id}`);
    setUsers(res.data);
    console.log(res.data);
  }

 

  const navigate = useNavigate();

  return (
    <>
      {off && <Sidebar handleSwitch={handleSwitch} />}
      {off && <Shadow handleSwitch={handleSwitch} />}
      <div className="admin__container">
        <h2>Admin</h2>
        {users?.map((userInfo: any, index: number) => (
          <div className="admin__row" key={userInfo._id}>
            <span>{index + 1}.</span>
            <div className="admin__row__left">
              <div>{userInfo.username}</div>
              <div>{userInfo.email}</div>
            </div>
            <div className="admin__row__right">
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(`/edituser/${userInfo._id}`)}
              >
                Edit user
              </Button>
              {
               !userInfo.isAdmin ? 
              (<Button
                variant="outlined"
                size="small"
                color="error"
                style={{ margin: 20 }}
                onClick={() => deleteUser(userInfo._id)}
  
              >
                Delete
              </Button>):
              (<Button
                variant="outlined"
                size="small"
                color="error"
                style={{ margin: 20 }}
                onClick={() => deleteUser(userInfo._id)}
                disabled
               >
                 Delete
              </Button>)
              } 
              {!userInfo.isAdmin ? (<Button variant = "outlined" >Assign Admin</Button>) : 
              (<Button variant = "outlined"  disabled>Assign Admin</Button>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
