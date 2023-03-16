import style from './App.js'
import { Route, Routes } from 'react-router'
import Cards from './components/Cards/Cards'

function App() {
  return (
    <div className={style.all}>
      <Routes>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/cards' component={Cards}/>
        <Route path='/detail' component={JobDetail}/>
      </Routes>
    </div>
  );
}

export default App;