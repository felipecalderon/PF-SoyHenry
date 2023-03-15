import { Nav } from './components/Nav/Nav'
import Cards from './components/Cards/Cards'
// import axios from 'axios';

// // axios.defaults.baseURL = 'https://localhost:3001';
// axios.defaults.baseURL = 'pf-soyhenry-production.up.railway.app';

function App() {
  return (
    <div>
      <div>
        <Nav/>
      </div>
      <div>
        <Cards/>  
      </div>      
    </div>
  );
}

export default App;