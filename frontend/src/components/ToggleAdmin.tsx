import Switch from '@mui/material/Switch';

type Props = {
    isAdmin:boolean,
    handleToggle:()=>void
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export function ToggleAdmin({isAdmin, handleToggle}: Props) {
  return (
    <div>
        <Switch {...label} onClick={handleToggle}/>
    </div>
  )
}
