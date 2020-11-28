import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PoolPage from "./pages/PoolPage";
import SpecificPoolPage from "./pages/SpecificPoolPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter forceRefresh={true}>
        {/* <BrowserRouter> */}
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Switch>
          <Route path="/pool/:id" component={SpecificPoolPage} />
          <Route path="/pool" component={PoolPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
