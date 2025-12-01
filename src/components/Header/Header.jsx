import React from 'react'
import {LogoutBtn, Logo, Container} from '../index'
import { Link, useNavigate  } from 'react-router'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems =[
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "My Posts",
        slug: "/my-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]



  return (
    <header className='py-3 shadow'>
      <Container>
        <nav className='flex flex-wrap items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width = '70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto w-full md:w-auto flex-wrap justify-center gap-2 mt-4 md:mt-0'>
              {navItems.map((item) => 
                item.active ? (
                  <li key = {item.name}>
                    <button 
                    onClick={() => navigate(item.slug)} 
                    className='inline-block px-4 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>  
  )
}

export default Header
