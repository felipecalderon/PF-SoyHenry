import { Nav } from './components/Nav/Nav'
import Cards from './components/Cards/Cards'
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div>
      <div>
        <Nav/>
      </div>
      <div>
        <LandingPage/>
        </div>

      <div>
        <Cards/>  
      </div>     
      
       
    </div>
  );
}

export default App;