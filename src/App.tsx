import Main from './layout/Main/Main'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Header from './layout/Main/Header/Header'

function App() {
  

  return (
    <>
      <Header />
      <Router>
            <Main />
      </Router>
    </>
  )
}

export default App
