import { Route, Routes } from 'react-router';
import './App.css';
import HomeRoute from './routes/home/home.route.jsx';
import Level1Route from './routes/levels/level1/level1.route.jsx';
import Level2Route from './routes/levels/level2/level2.route.jsx';
import Level3Route from './routes/levels/level3/level3.route.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomeRoute />} />
        <Route path='/config' element={<Level1Route />} />
        <Route path='/level1' element={<Level2Route />} />
        <Route path='/versLevel2' element={<Level3Route />} />
      </Routes>
    </>
  )
}

export default App;
