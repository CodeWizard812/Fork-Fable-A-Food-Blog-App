import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header, Container } from './components'
import { Outlet } from 'react-router'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.auth.userData)

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading? (
    <div className='flex flex-wrap content-between'>
      <div className='w-full min-h-screen flex flex-col'>
        <Header/>
        {userData && (
          <Container>
            <div className="pt-2 text-left font-bold text-lg">
              Welcome, {userData.name}
            </div>
          </Container>
        )}

        <main className='flex-grow'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App
