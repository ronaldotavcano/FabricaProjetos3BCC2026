import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/styles.css'

import Layout from './Layout'
import Home from './pages/Home'
import Agente from './pages/Agente'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agente" element={<Agente />} />
      </Routes>
    </Layout> 
  </BrowserRouter>
)
