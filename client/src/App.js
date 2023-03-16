import style from './App.js'
import { Route, Routes } from 'react-router'
import Cards from './components/Cards/Cards'
import LandingPage from './components/LandingPage/LandingPage';
import JobDetail from './components/JobDetail/JobDetail';


function App() {
  return (
    <div className={style.all}>
      <Routes>
        <Route path='/' component={LandingPage}/>
        <Route path='/cards' component={Cards}/>
        <Route path='/detail' component={JobDetail}/>
      </Routes>
    </div>
  );
}

export default App;