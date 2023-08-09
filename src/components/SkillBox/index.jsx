import { useState } from 'react'
import './style.css'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import {AiOutlineMinus, AiOutlinePlus, AiFillDelete} from 'react-icons/ai'
import { deleteFromApi, levelAlterApi } from '../../services/skillService'

function SkillBox (props){
    const [opened, setOpened] = useState(false)
    const [acord, setAcord] = useState({})
    const [descT, setDescT] = useState({})
    const [inside, setInside] = useState({display: 'none'})
    const [levelBox, setLevelBox] = useState({display: 'none'})
    const [level, setLevel] = useState(props.skillObj.level)

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const acordUpdate = async () => {
        setOpened(!opened)

        if(opened) {
            setAcord({height: '80px'})
            setDescT({display: 'block'})
            setInside({display: 'none'})
            setLevelBox({display: 'none'})
            console.log(props.skillObj)
        } else {
            setAcord({height: 'fit-content'})
            setDescT({display: 'none'})
            await delay(100)
            setInside({display: 'block'})
            setLevelBox({display: 'flex'})
        }
        
    }

    const levelUpdate = async (sinal) => {
        let temp = level
        
        if(sinal){ 
            setLevel(level < 5 ? level + 1 : level) 
            temp = temp < 5 ? temp + 1 : temp
        } else{ 
            setLevel(level > 0 ? level-1 : level);
            temp = temp > 0 ? temp - 1 : temp
        }

        await levelAlterApi(props.account,props.skillObj.id, temp )
    }

    const deleteSkill = async() => {
        console.log(props.list.data);
        console.log("filtrada: ", props.list.data.filter((objSkill) => objSkill.id != props.skillObj.id));
        props.setList({data :props.list.data.filter((objSkill) => objSkill.id != props.skillObj.id)})
        await deleteFromApi(props.account,props.skillObj.id)
        props.getAddSkillList()
    }

    return(
        <div className='skillBox' style={acord}>
            <div className='topSkillBox'>
            <img src={props.skillObj.photo} alt="icon" />
            <span className='title'>{props.skillObj.name}</span>
            <span className='desc' style={descT}>{props.skillObj.desc.substring(0,20)+"..."}</span>
            {opened ? <IoIosArrowUp className='skillArrow' onClick={acordUpdate}/>: <IoIosArrowDown className='skillArrow' onClick={acordUpdate}/>}
            </div>
            <p style={inside}>{props.skillObj.desc}</p>
            <span className='level' style={inside}>Level: </span>
            <div className='levelCounter' style={levelBox}>
                <AiOutlineMinus className='pmIcon' onClick={() => {levelUpdate(false)}}/>
                <span>{level}</span>
                <AiOutlinePlus className='pmIcon'onClick={() => {levelUpdate(true)}}/>
            </div>
            <AiFillDelete className='trashCan' style={inside} onClick={deleteSkill}/>
        </div>
    )
}

export default SkillBox