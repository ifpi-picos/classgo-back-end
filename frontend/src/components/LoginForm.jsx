import Link from "next/link"

export default function LoginForm() {
    return (
        <form className="w-1/3 h-3/5 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <legend className="m-auto px-6 py-3 border border-gray-100 rounded-sm">idCurso</legend>

                <div className="flex justify-center">
                    <span>Login</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="email" className="mb-3">Email</label>
                        <input id="email" name="email" type="email" placeholder="Digite seu email" required className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm"/>
                    </div>

                    <div className="w-5/6 flex flex-col">
                        <label className="mb-3" htmlFor="password">Senha</label>
                        <input id="passoword" name="password" type="password" placeholder="Digite sua senha" required className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm"/>

                        <Link className="mt-3 underline flex justify-end" href="/">esqueceu senha?</Link>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button className="px-6 py-2 mb-5 border border-gray-100 rounded-sm" type="button">Entrar</button>
                    <Link className="underline" href="/register">Cadastrar-se</Link>
                </div>
            </fieldset>
        </form>
    )
}
