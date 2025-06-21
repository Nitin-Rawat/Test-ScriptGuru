import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
// import BoardDetail from './components/BoardDetail'
import KanbanBoard from './Components/KanbanBoard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<KanbanBoard/> } />
          {/* <Route path="boards/:id" element={<BoardDetail />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
