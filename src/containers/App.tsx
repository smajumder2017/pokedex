import React from 'react';
import {useRoutes} from 'hookrouter';

import Routes from './../routes';
import Navigation from './../components/Navigation';
import './App.css';


const App: React.FC = () => {
  const routeResult = useRoutes(Routes)
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <div className={'App-body'}>
        {routeResult}
      </div>
    </div>
  );
}

export default App;
