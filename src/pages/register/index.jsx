import { useState } from 'react'
import './style.css'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { registerApi } from '../../services/accountService'

function Register () {
    const [eye, setEye] = useState(true)
    const [visib, setVisib] = useState("password")
    const [login, setLogin] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [conPass, setConPass] = useState("")

    const validEmail = (email) => {
        const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.match(validRegex)){
            return true
        } else {
            return false
        }
    }

    const handleEye = () => {
        eye ? setVisib('text') : setVisib('password');
        setEye(!eye)
    }


    const handleRegister = async () => {
        if(login == "" || email == "" || pass == "" || conPass == "") {
            toast.dismiss()
            toast.error("Todos os campos devem se preenchidos")
        }else if(conPass != pass) {
            toast.dismiss()
            toast.error("As senhas estão diferentes")
        }else if(!validEmail(email)){
            toast.dismiss()
            toast.error("Insira um e-mail válido")
        }else {
            let newUser = {
                username: login,
                email: email,
                role: ["user"],
                password: pass
            }
            const request = await registerApi(newUser)
            if(request.status == 200){
                toast.dismiss()
                toast.success("Registrado com sucesso!")
                console.log(newUser)
            }else {
                toast.dismiss()
         
                toast.error(request.response.data.message)
            }
        } 
        
        let newUser = {
            username: login,
            email: email,
            role: ["user"],
            password: pass
        }
    }

    return (
        <main className='registerMain'>
            <p>Gerencie as suas habilidades <br/> em seu jogo predileto!</p>
            <input placeholder='Login' type='text' value={login} onChange={(e) => setLogin(e.target.value)}/>
            <input placeholder='E-Mail' type='e-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div className='passwordInput'><input placeholder='Senha' type={visib} value={pass} onChange={(e) => setPass(e.target.value)}/>{eye ? <AiFillEye className='eye' onClick={handleEye} /> : <AiFillEyeInvisible className='eye' onClick={handleEye} />}</div>
            <input placeholder='Confirmar Senha' type={visib} value={conPass} onChange={(e) => setConPass(e.target.value)}/>
            <a><Link to={'/login'}>Já possui uma conta?</Link></a>
            <button onClick={handleRegister}>Registrar</button>
            <Toaster />
        </main>
    )
}

export default Register