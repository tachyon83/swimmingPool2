import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PoolPage from "./pages/PoolPage";
import SpecificPoolPage from "./pages/SpecificPoolPage";
import AdminPage from "./pages/AdminPage";
import AdminSpecificPoolPage from "./pages/AdminSpecificPoolPage";
import NotFoundPage from "./pages/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/pool/:id" component={SpecificPoolPage} />
          <Route path="/pool" component={PoolPage} />
          <Route path="/admin/:id" component={AdminSpecificPoolPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
