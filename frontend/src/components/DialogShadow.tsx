import "../sass/dialogshadow.scss"

type Props = {
    orderdialogSwitch:() => void
    setOpenOrder:React.Dispatch<React.SetStateAction<any>>
}



export function DialogShadow({orderdialogSwitch}: Props) {
  return (
    <div className="dialogshadow" onClick={orderdialogSwitch}>

    </div>
  )
}


