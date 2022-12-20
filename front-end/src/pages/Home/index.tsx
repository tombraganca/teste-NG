import React, { Fragment, useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'

import { Notify } from '../../components/Notify';
import { Context } from '../../Context/AuthContext';
import logoImg from '../../assets/svg/logo.svg';
import { findAccountByEmail } from '../../services/AccountService';



export function Home() {

    const [showMenu, setShowMenu] = React.useState(false);
    const navigate = useNavigate();
    const { handleLogout } = useContext(Context);

    async function handleSignOut() {
        try {
            await handleLogout();
            navigate('/login');
        } catch (error: any) {
            console.log(error)
            Notify({ message: error.message, type: 'error' });
        }
    }

    function handleOpenMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <main>
            <nav className='bg-black p-4 h-20 flex items-center justify-between'>
                <div>
                    <Link to='/'>
                        <img src={logoImg} alt="" className='h-12' />
                    </Link>
                </div>
                <div>
                    <ul className="flex">
                        <li className='inline-block mr-8'>
                            <Link to='/home' className='text-white text-lg font-bold'>Home</Link>
                        </li>
                        <li className='inline-block mr-8'>
                            <Link to='/transactions' className='text-white text-lg font-bold'>My transactions</Link>
                        </li>
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='https://github.com/tombraganca/teste-NG'
                                                className={(active ? 'bg-gray-100' : '') + ' block px-4 py-2 text-sm text-gray-700 w-full'}
                                            >
                                                About

                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleSignOut}
                                                className={(active ? 'bg-gray-100' : '') + ' block px-4 py-2 text-sm text-gray-700 w-full text-left'}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </ul>
                </div>
            </nav>
            <section className="flex-1 max-w-[1344px] mx-auto my-14">
                <Outlet></Outlet>
            </section>
        </main >
    )
}