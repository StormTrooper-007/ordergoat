
import "../sass/shadow.scss";
type Props = {
  handleSwitch:() => void
}

export function Shadow({handleSwitch}: Props) {
  return (
     <div className="shadow" onClick={handleSwitch}>

     </div>
  )
}

