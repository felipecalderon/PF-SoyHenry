import style from './App.css';
import { Nav } from './components/Nav/Nav'
import Card from './components/Cards/Card'

function App() {
  return (
    <div>
      <div className={style.nav}>
        <Nav/>
      </div>
      <div>
        <Card />  
      </div>      
    </div>
  );
}

export default App;