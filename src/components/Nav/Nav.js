import Link from 'next/link'

const Nav = () => {
    return (
        <div className={`w-[30%] h-screen bg-black text-white flex flex-col items-center justify-center py-10`}>
            <ul className={`flex flex-col justify-space-around text-center self-center my-[auto]`}>
                    <li className={`p-2`}>
                        <Link href="/">Validator</Link>
                    </li>
                    <li className={`p-2`}>
                        <Link href='/blacklisted-countries'>Blacklisted Countries</Link>
                    </li>
            </ul>
            <p className={`text-[.8rem] italic`}>By Justin Fester</p>
        </div>
    )
}

export default Nav;