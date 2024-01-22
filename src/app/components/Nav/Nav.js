import Link from 'next/link'
import { FiCheckCircle } from "react-icons/fi";

const Nav = () => {
    return (
        <div 
            className={`
                w-[30%]
                h-screen
                bg-black
                text-white
                flex
                flex-col
                items-center
                justify-center
                py-10
            `}
        >
            {/* <div 
                className={`
                text-gray-900
                text-[6rem]
                flex
                items-center
                `}
            >
                <FiCheckCircle />
            </div> */}
            <ul 
                className={`
                    flex
                    flex-col
                    justify-space-around
                    text-center
                    self-center
                    my-[auto]
                `}>
                    <li className={`p-2`}>
                        <Link href="/">Validator</Link>
                    </li>
                    <li className={`p-2`}>
                        <Link href='/allowed-countries'>Allowed Countries</Link>
                    </li>
            </ul>
            <p 
                className={`
                    text-[.8rem]
                    italic
                `}
            >
                By Justin Fester
            </p>
        </div>
    )
}

export default Nav;