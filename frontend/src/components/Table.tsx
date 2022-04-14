import { useState } from "react";
import "../sass/table.scss";

type Props = {
    setTableNumber:React.Dispatch<React.SetStateAction<number>>
    t:number
}

export function Table({setTableNumber,t}: Props) {
    const [active, setActive] = useState<boolean>(false);

    function changeTableNumber(){
        setTableNumber(t);
        setActive(!active);
    }

  return <div className={active ? `table__active`:`table`} onClick={changeTableNumber}>{t}</div>
}


