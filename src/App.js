import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";
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
          </Switch>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>

          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
          </Switch>

          <Switch>
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
