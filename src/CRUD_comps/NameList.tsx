import React, { useEffect, useState } from 'react'
import {Record} from './model'

interface Props {
  selected: Record|null
  setSelected: React.Dispatch<React.SetStateAction<Record | null>>
  people:Record[]
}


const NameList: React.FC<Props> = ({selected, setSelected, people}) => {

  const [filtered, setFiltered] = useState<Record[]>(people)
  const [prefix, setPrefix] = useState<string>("")

  const handleSelect = (id: number) => {
    let [guy] = people.filter((person)=> person.id === id)
    setSelected(guy)
  }

  useEffect(() => {
    setPrefix("")
    setFiltered(people)
  }, [people])

  useEffect(()=> {
    setFiltered(people.filter((person) => (
      person.last.toLowerCase().substring(0,prefix.length)===prefix.toLocaleLowerCase()
    )))
  }, [prefix, people])

  return (
    <div>
      <label> filter prefix:</label>
      <input type="text" id="filter" value={prefix} onChange={(e)=>setPrefix(e.target.value)}/>
      <select className="full-width" id="list" name="list" size={5} onChange={(e)=>handleSelect(parseInt(e.target.value))}>
        {
          filtered.sort(function(a, b) {
            var textA = a.last.toUpperCase();
            var textB = b.last.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }).map((person) => (
            <option key={person.id} value={person.id}>{person.last}, {person.first}</option>
          ))
        }
      </select>
    </div>
  )
}

export default NameList