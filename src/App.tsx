import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Signin } from './pages/Signin'
import {Home} from './pages/Home'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App