import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Signin } from './pages/Signin'
import {Home} from './pages/Home'

import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App