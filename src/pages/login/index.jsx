import { useState } from 'react'
import './style.css'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { loginApi } from '../../services/accountService'
import { useContext } from 'react'
import { AccountContext } from '../../context/accountContext'

function Login () {
    const [eye, setEye] = useState(true)
    const [visib, setVisib] = useState("password")
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const { setAccount } = useContext(AccountContext)
    const navigate = useNavigate()

    const handleEye = () => {
        eye ? setVisib('text') : setVisib('password');
        setEye(!eye)
    }


    const handleLogin = async () => {
        if(login == "" || pass == "") {
            toast.dismiss()
            toast.error("Todos os campos devem se preenchidos")
        }else {
            let newUser = {
                username: login,
                password: pass
            }
            const request = await loginApi(newUser)
            if(request.status == 200){
                toast.dismiss()
                toast.success("Logado com sucesso!")
                localStorage.setItem('accountData',JSON.stringify(request.data))
                setAccount(request.data)
                navigate('/')
            }else {
                toast.dismiss()
                toast.error("Usuário ou senha incorreto(s)")
                console.log(request)
                console.log(newUser)
            }
        } 
        
    }

    return (
        <main className='loginMain'>
            <MdArrowBackIosNew className='backButton' onClick={() => navigate('/')}/>
            <p>Gerencie as suas habilidades <br/> em seu jogo predileto!</p>
            <input placeholder='Login' type='text' value={login} onChange={(e) => setLogin(e.target.value)}/>
            <div className='passwordInput'><input placeholder='Senha' type={visib} value={pass} onChange={(e) => setPass(e.target.value)}/>{eye ? <AiFillEye className='eye' onClick={handleEye} /> : <AiFillEyeInvisible className='eye' onClick={handleEye} />}</div>
            <button onClick={handleLogin}>Entrar</button>
            <Toaster />
        </main>
    )
}

export default Login