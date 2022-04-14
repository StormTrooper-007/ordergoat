import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ChangeEvent } from 'react';

type Props = {
  notes:string,
  setNotes:React.Dispatch<React.SetStateAction<string>>
}

export function TextArea({notes, setNotes}: Props) {

  function handleChange(e:ChangeEvent<HTMLTextAreaElement>):void{
    setNotes(e.target.value);
  }
  
  return (
    <>
      <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
      value={notes}
      onChange={handleChange}
    />
    </>
  )
}






