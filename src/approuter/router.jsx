import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Signup from '../pages/signup'
import Dashboard from '../pages/dashboard'
import CreatePitch from '../pages/createPitch'
import GeneratedPitch from '../pages/generatedPitch'
import Export from '../pages/Export'

export default function AppRouter() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/createpitch" element={<CreatePitch />} />
          <Route path="/generatedpitch" element={<GeneratedPitch />} />
          <Route path="/export" element={<Export />} />
            
        </Routes>
      </Router>

    </div>
  )
}


