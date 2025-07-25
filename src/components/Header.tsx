import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Popover } from 'antd';
import { PiInfoThin } from "react-icons/pi";

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const content = (
        <div>
            <p><Link to="/">First</Link> - with API, using form validation(schema - yup)</p>
            <p><Link to="/second">Second</Link> - local, using useState Hook</p>
            <p><Link to="/third">Third</Link> - local, using useRef Hook</p>
        </div>
    );
    return (
        <header className='site_header m-1.5 px-1 h-16 md:h-20 border border-gray-500 rounded-lg'>
            <div className='container w-full h-full'>
                <nav className='header_nav w-full h-full relative flex items-center justify-end'>
                    <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center gap-4'>
                        <NavLink to={"/"} className='header_link text-xl'>First</NavLink>
                        <NavLink to={"/second"} className='header_link text-xl'>Second</NavLink>
                        <NavLink to={"/third"} className='header_link text-xl'>Third</NavLink>
                    </div>
                    <div>
                        <Popover
                            content={content}
                            placement='bottomLeft'
                            title="Practiced doing CRUD using different ways"
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}>
                            <button>
                                <PiInfoThin className='text-lg' />
                            </button>
                        </Popover>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default React.memo(Header);
