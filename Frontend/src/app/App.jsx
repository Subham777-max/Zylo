import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'

function App() {
  const { handleGetMe,loading } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  if(loading){
    return null;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App