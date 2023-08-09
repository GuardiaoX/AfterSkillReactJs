import { useEffect, useState } from 'react'
import './style.css'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'

function SkillBoxAdd (props){

    useEffect(() => {console.log()},[])

    return(
        <div className='skillBoxAdd' onClick={() => {props.addSkill(props.skillObj)}}>
            <div className='topSkillBox'>
            <img src={props.skillObj.photo} alt="icon" />
            <span className='title'>{props.skillObj.name}</span>
            <span className='desc'>{props.skillObj.desc?.substring(0,20)+"..."}</span>
            <IoIosArrowUp className='skillArrow' />
            </div>
        </div>
    )
}

export default SkillBoxAdd