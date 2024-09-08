import "./App.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ClayIconSpriteContext } from "@clayui/icon";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

const spritemap = "/icons.svg";

function App() {
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>

            <Route exact path="/">
              <Redirect to="/home?userId=419432" />
            </Route>

            <Route exact path="/home">
              <HomePage />
            </Route>

            <Route exact path="/details">
              <DetailsPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ClayIconSpriteContext.Provider>
  );
}

export default App;
