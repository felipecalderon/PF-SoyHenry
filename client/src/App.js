import style from './App.js'
import { Route, Routes } from 'react-router'
import Cards from './components/Cards/Cards'
import LandingPage from './components/LandingPage/LandingPage';
import JobDetail from './components/JobDetail/JobDetail';



function App() {
  return (
    <div className={style.all}>
      <Routes>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/cards' component={Cards}/>
        <Route path='/detail/:id' component={JobDetail}/>
      </Routes>
      
    </div>
  );
}

export default App;