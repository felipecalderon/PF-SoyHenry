import { NavLanding } from './components/NavLanding/NavLanding'
import Cards from './components/Cards/Cards'
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <div>
      
      <div>
        <LandingPage/>
        </div>

      <div>
        <Cards/>  
      </div>      
    </div>
  );
}

{/* <Switch>
<Route exact path='/' component={LandingPage}/>
<Route exact path='/home' component={Cards}/>
<Route path='' component={Detail}/>
<Route/>
</Switch>  */}
export default App;

