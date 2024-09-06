import "./App.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ClayIconSpriteContext } from "@clayui/icon";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ItemDetailsPage from "./pages/ItemDetailsPage";

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
              <Home />
            </Route>

            <Route exact path="/details">
              <ItemDetailsPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ClayIconSpriteContext.Provider>
  );
}

export default App;
