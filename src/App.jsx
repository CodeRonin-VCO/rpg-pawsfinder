import { Route, Routes } from 'react-router';
import './App.css';
import HomeRoute from './routes/home/home.route.jsx';
import Level1Route from './routes/levels/level1/level1.route.jsx';
import Level2Route from './routes/levels/level2/level2.route.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomeRoute />} />
        <Route path='/config' element={<Level1Route />} />
        <Route path='/level1' element={<Level2Route />} />
      </Routes>
    </>
  )
}

export default App;
