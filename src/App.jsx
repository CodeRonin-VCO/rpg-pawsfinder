import { Route, Routes } from 'react-router';
import './App.css';
import HomeRoute from './routes/home/home.route.jsx';
import Level1Route from './routes/levels/level1/level1.route.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomeRoute />} />
        <Route path='/level1' element={<Level1Route />} />
      </Routes>
    </>
  )
}

export default App;
