import React, { useEffect, useState } from 'react'
import { Record } from './model'

interface Props {
  selected: Record|null
  setSelected: React.Dispatch<React.SetStateAction<Record | null>>
  people:Record[]
  setPeople: React.Dispatch<React.SetStateAction<Record[]>>
}

const Inputs: React.FC<Props> = ({selected, setSelected, people, setPeople}) => {

  let fName = selected? selected.first : ""
  let lName = selected? selected.last : ""

  const [firstName, setFirstName] = useState<string>(fName)
  const [lastName, setLastName] = useState<string>(lName)

  const clearFields = () => {
    setFirstName("")
    setLastName("")
  }

  const deselect = () => {
    setSelected(null)
  }

  const handleCreate = () => {
    if (firstName!=="" && lastName!==""){
      let addMe:Record = {id:Date.now(), first:firstName, last:lastName}
      setPeople([...people, addMe])
      clearFields();
      deselect();
    }
  }

  const handleDel = () => {
    if (selected){
      setPeople(people.filter((person)=> person.id !== selected.id))
      clearFields();
      deselect();
    }
  }
  
  const handleUpdate = () => {
    if (selected){
      setPeople(
        people.map((person)=> 
          person.id===selected.id?{...person, first:firstName, last: lastName}
          : person)
      )
      clearFields();
      deselect();
    }
  }

  useEffect(() => {
    if(selected!==null){
      setFirstName(selected.first)
      setLastName(selected.last)
    }else{
      clearFields()
    }
  }, [selected])

  return (
    <div className="stack">
      <label htmlFor='first'> first:</label>
      <input type="text" id="first" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
      
      <label htmlFor='last'> last:</label>
      <input type="text" id="last" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
      
      <div className="horiz">
        <button onClick={()=>handleCreate()}>Create</button>

        <button
          disabled={!selected? true : false}
          onClick={()=>handleUpdate()}
        >Update</button>

        <button
          disabled={!selected? true : false}
          onClick={()=>handleDel()}
        >Delete</button>

      </div>
    </div>
  )
}

export default Inputs