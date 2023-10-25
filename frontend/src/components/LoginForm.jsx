"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const signInUrl = "http://localhost:3030/"

    const router = useRouter()

    const signIn = () => {
        if (!email) {
            return alert("Campo Email vazio!")
        }

        else if (!password) {
            return alert("Campo Senha vazio!")
        }

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                localStorage.setItem("token", res.data)
                alert("Login realiado com sucesso!")
            })
            .catch((err) => {
                if (err.response.data === "user not exist") {
                    return alert("Usuário não cadastrado!")
                }

                else if (err.response.data === "password invalid") {
                    return alert("Senha incorreta!")
                }

                return console.log(err)
            })
    }

    return (
        <form className="w-1/3 h-3/5 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <legend className="m-auto px-6 py-3 border border-gray-100 rounded-sm">idCurso</legend>

                <div className="flex justify-center">
                    <span className="text-xl">Login</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="email" className="mb-3">Email</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="email" name="email" type="email" placeholder="Digite seu email" required onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 flex flex-col">
                        <label className="mb-3" htmlFor="password">Senha</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="password" name="password" type="password" placeholder="Digite sua senha" required onChange={(e) => setPassword(e.currentTarget.value)}/>

                        <Link className="mt-3 underline flex justify-end" href="/forgotpassword">esqueceu senha?</Link>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-sm" type="button" onClick={() => {signIn()}}>Entrar</button>
                    <Link className="underline" href="/signup">Cadastrar-se</Link>
                </div>
            </fieldset>
        </form>
    )
}
