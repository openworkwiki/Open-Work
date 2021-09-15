import Link from 'next/link';
//import s from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../icons/Logo';
import { useUser } from '../../../utils/useUser';
import SearchBar from '../SearchBar/SearchBar';
//import { ModalProvider } from '../../../utils/use-modal';
import { useContext } from 'react';
import ModalsContext from '../../modals/modalsContext';

const Navbar = () => {
  const { user, signOut } = useUser();
  const {service} = useContext(ModalsContext)

  let listener = null;
  const [scrollState, setScrollState] = useState("bg-transparent")
  const [buttonState, setButtonState] = useState("bg-white hover:bg-gray-200")

  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 10) {
        if (scrollState !== "bg-white bg-opacity-80 border") {
          setScrollState("bg-white bg-opacity-80 border")
          setButtonState("bg-white hover:bg-gray-200 border border-gray-400")
        }
      } else {
        if (scrollState !== "bg-transparent") {
          setScrollState("bg-transparent")
          setButtonState("bg-white hover:bg-gray-200")
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])

  return (
    <>
      <div className={`sticky top-0 ${scrollState} z-40 transition-all mx-auto flex flex-wrap px-2 py-2 flex-col md:flex-row items-center`}>
        <nav className="w-full flex flex-wrap items-center text-base justify-between">
        <div className="flex items-center justify-center">
        <Link href="/">
              <a className="title-font font-medium text-gray-900 pr-4 rounded hover:shadow hover:bg-white transition" aria-label="Logo">
              <div className="flex items-center">
              <Logo />
              <span className="ml-3 text-xl">Gardens</span>
              </div>
              </a>
              </Link>
        </div>
        <div className="flex items-center justify-center">
              <Link href="/tools">
                <a className={`mr-2.5 ${buttonState} py-1 px-2 focus:outline-none rounded text-base`}>Tools</a>
              </Link>
              <Link href="/flows">
                <a className="mr-2.5 bg-white py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base">Flows</a>
              </Link>
              {/*
              <Link href="/account">
                <a className="mr-2.5 bg-white py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base">Account</a>
              </Link>*/}
              {user ? (
              <Link href="#">
                <a className="mr-2.5 bg-white py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base" onClick={() => signOut()}>
                  Sign out
                </a>
              </Link>
            ) : (
              
              null
            )}
             <button className="hidden md:inline-flex items-center bg-white border border-black py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-2 md:mt-0" 
 onClick={() => {
      service.openModal("newFlow")
    }}>
      Submit a flow
      <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
    </button>
            <SearchBar/>
            {/*<Link href="/signin">
                <a className="mr-2.5 bg-white py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base">Sign in</a>
              </Link>*/}
        </div>
        </nav>
      </div>
      </>
  );
};

export default Navbar;
