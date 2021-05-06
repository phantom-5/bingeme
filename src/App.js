import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import PrivateList from './components/PrivateList'
import PublicPage from './components/PublicPage'
import PublicList from './components/PublicList'

console.log = () => {} //disable console




function App() {

  return (
    <Router>
    <div className="App">
      <Route path='/' component={Navbar}/>
      <Route exact path='/'>
        <PublicPage />
      </Route>
      <Route exact path='/user' component={PublicList}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/dashboard/private' component={PrivateList}/>
    </div>
    </Router>    
  );
}

export default App;
