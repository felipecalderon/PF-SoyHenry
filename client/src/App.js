import { Nav } from './components/Nav/Nav'
import Cards from './components/Cards/Cards'
import JobDetail from './components/JobDetail/JobDetail';

function App() {
  return (
    <div>
      <div>
        <Nav/>
      </div>
      <div>
        <Cards/>  
      </div>   
      <div> <JobDetail/></div>  
    </div>
  );
}

export default App;