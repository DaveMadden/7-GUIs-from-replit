import React, { useState } from 'react'
// import Filter from './CRUD_comps/Filter'
import Inputs from './CRUD_comps/Inputs'
import NameList from './CRUD_comps/NameList'
import { Record } from './CRUD_comps/model'


function CRUD(): JSX.Element{

const [selected, setSelected] = useState<Record|null>(null)
const [people, setPeople] = useState<Record[]>([])


  return (
    <div className="thing horiz">
        <div className="leftright">
            {/* <Filter/> */}
            <NameList
                selected={selected}
                setSelected={setSelected}
                people={people}
            />
        </div>
        <div className="leftright">
            <Inputs
                selected={selected}
                setSelected={setSelected}
                people={people}
                setPeople={setPeople}
            />
        </div>

    </div>
  )
}

export default CRUD