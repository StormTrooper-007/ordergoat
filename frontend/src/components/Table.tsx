import { useState } from "react";
import {useNavigate } from "react-router-dom";
import "../sass/table.scss";

type Props = {
    setTableNumber:React.Dispatch<React.SetStateAction<number>>
    t:number
}

export function Table({setTableNumber, t}: Props) {
    const [active, setActive] = useState<boolean>(false);
    const navigate = useNavigate();
    function changeTableNumber(){
        setTableNumber(t);
        setActive(!active);
        navigate("/");
    }
  return <div className="table" onClick={changeTableNumber}>{t}</div>
}


