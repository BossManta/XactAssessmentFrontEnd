import * as React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    
}
 
const Navbar: React.FunctionComponent<NavbarProps> = () => {

    const links = [
        {text:"Debtors Master", to:"/debtorsmaster"},
        {text:"Stock Master", to:"/stockmaster"},
        {text:"Invoice", to:"/invoice"}
    ]

    return ( 
        <nav className='sticky flex top-0 h-16 bg-emerald-600'>
            {links.map((linkInfo, i)=>
                <Link   className='text-white flex text-xl px-2 mx-5 items-center justify-center h-full hover:bg-emerald-500 shadow-lg'
                        key={i}
                        to={linkInfo.to}>

                        {linkInfo.text}
                </Link>
            )}
        </nav>
     );
}
 
export default Navbar;