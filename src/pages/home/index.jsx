import { useEffect, useState } from 'react'
import SkillBox from '../../components/SkillBox'
import './style.css'
import {BsPlusLg} from 'react-icons/bs'
import {AiOutlineLogout, AiOutlineClose} from 'react-icons/ai'
import { addSkillApi, getAllSkill, skillListFromApi } from '../../services/skillService'
import { useContext } from 'react'
import { AccountContext } from '../../context/accountContext'
import Modal from "react-modal"
import SkillBoxAdd from '../../components/SkillBoxAdd'

function Home () {
    const[list, setList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const[modalList, setModalList] = useState([])
    const { account, setAccount } = useContext(AccountContext)
    const [trueSize, setTrueSize] = useState()   

    useEffect(() => {
        getSkillList()
        getAddSkillList()
    },[])

    const getSkillList = async () =>{   
        setList(await skillListFromApi(account))
    }

    const getAddSkillList = async () => {
        const temp = await getAllSkill(account)
        setModalList(temp);
        setTrueSize(temp.data.length)
    // console.log(modalList.data.filter((skill) => { skill.id == 2
    //     //list.data.some((skilli) => skill.id == skilli.id)
    // }))
    }

    const handlePlus = async () => {
        console.log(trueSize)
        if(list.data.length > 0){
            console.log('entrei');
            console.log('uai: ',{data: modalList.data.filter((skill) => list.data.some((skilli) => skill.id == skilli.id))});
            console.log('lista usuario: ', list.data.map((skilli) => {return skilli.id}) );
            setModalList({data: modalList.data.filter((skill) => !list.data.some((skilli) => skill.id == skilli.id))});
            
        }
        if(list.data.length == trueSize) {
            console.log('limpei');
            setModalList({data: []})
        }
        setIsOpen(true)
    }

    const addSkill = async (skillObj) => {
        await addSkillApi(account, skillObj.id, 0)
        let temp = list.data
        console.log(modalList.data.filter((skill) => skill.id != skillObj.id));
        setModalList({data: modalList.data.filter((skill) => skill.id != skillObj.id)})
        setList({data: [...temp, {id: skillObj.id, name: skillObj.name, desc: skillObj.desc , photo: skillObj.photo, level: 0}]})
        //handlePlus()
    }

    const deslogar = () => {
        localStorage.clear()
        setAccount(null)
    }

    return(
        <main className='homeMain'>
            <AiOutlineLogout className='logout' onClick={deslogar}/>
            <BsPlusLg className='plusIcon' onClick={() => {handlePlus()}}/>
            {list?.data?.map((skill) => {
                return(
                    <SkillBox skillObj={skill} account={account} key={skill.id} list={list} setList={setList} getAddSkillList={getAddSkillList}/>
                )
            })}
            <Modal
                isOpen={isOpen}
                className="addModal"
                ariaHideApp={false}
                style={{overlay: {backgroundColor: '#00000056'}}}
            >
                <p className='quitModalLogo' onClick={() => {setIsOpen(!isOpen)}}>X</p>
                {modalList?.data?.map((skill, index) => {
                    return(
                    <SkillBoxAdd skillObj={skill} key={index} addSkill={addSkill} />
                    )
                })}
            </Modal>
        </main>
    )
}

export default Home