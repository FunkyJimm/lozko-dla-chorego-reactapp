import './App.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';

import Ambulances from './hospitals/Ambulances';
import Hospitals from './hospitals/Hospitals';

import Dispatcher from './professions/Dispatcher';
import Doctor from './professions/Doctor';
import Paramedic from './professions/Paramedic';

import Finder from './Finder';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li><NavLink to="/">Strona główna</NavLink></li>
            <li><NavLink to="/ambulances">Ambulanse</NavLink></li>
            <li><NavLink to="/dispatchers">Dyspozytorzy</NavLink></li>
            <li><NavLink to="/doctors">Lekarze</NavLink></li>
            <li><NavLink to="/paramedics">Ratownicy</NavLink></li>
            <li><NavLink to="/hospitals">Szpitale</NavLink></li>
            <li><NavLink to="/search">Wyszukiwanie</NavLink></li>
          </ul>
        </nav>
        <section>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/ambulances" component={Ambulances} />
            <Route path="/dispatchers" component={Dispatcher} />
            <Route path="/doctors" component={Doctor} />
            <Route path="/paramedics" component={Paramedic} />
            <Route path="/hospitals" component={Hospitals} />
            <Route path="/search" component={Finder} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
