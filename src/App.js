import React from 'react'
import Search from './Order/Search'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Locations from './Order/locations';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
            <Route exact path="/search"><Search /></Route>
            <Route exact path="/locations"><Locations /></Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App
