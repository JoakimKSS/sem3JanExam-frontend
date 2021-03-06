import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import facade from './components/apiFacade';
import Login from './components/login';
import UserPage from './components/userPage';
import AddSportForm from './components/addSportForm';
import AddTeamForm from './components/addTeamForm';
import RemoveTeamForm from './components/removeTeamForm';
import RemoveSportForm from './components/removeSportForm';
import EditTeamForm from './components/editTeamForm';
import EditSportForm from './components/editSportForm';
import SportsList from './components/sportsList';
import TeamsList from './components/teamsList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  return (
    <Router>
      <div className="container">
        <ul className="nav border-bottom mb-4 justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sports">Sports</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/teams">Teams</Link>
          </li>
          {roles.includes("user") ?
            <li classname="nav-item">
              <Link className="nav-link" to="/user">User page</Link>
            </li>
            : ""
          }
          {roles.includes("admin") ?
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin page</Link>
            </li>
            : ""
          }
          {roles.includes("user") || roles.includes("admin") ?
            <li className="nav-item">
              <Link className="nav-link" to="/both">Admin/User page</Link>
            </li>
            : ""
          }

        </ul>
        <div className="row justify-content-center">

          <Route exact path="/">
            {isLoggedIn ?
              <div className="row mb-4">
                <div className="col border rounded p-3">
                  <UserPage roles={roles} />
                  <button className="btn btn-secondary w-100" onClick={() => facade.logOut(setIsLoggedIn, setRoles)}>Log out</button>
                </div>
              </div>
              :
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRoles={setRoles} />
            }
          </Route>
          <Route path="/sports">
            <div className="row mb-4">
              <div className="col border rounded p-3">
                <h3 className="mb-3">Sports list</h3>
                <SportsList></SportsList>
              </div>
            </div>
          </Route>
          <Route path="/teams">
            <div className="row mb-4">
              <div className="col border rounded p-3">
                <h3 className="mb-3">Teams list</h3>
                <TeamsList></TeamsList>
              </div>
            </div>
          </Route>

          <Route path="/user">
            {roles.includes("user") ?
              <div className="row mb-4">
                <div className="col border rounded p-3">
                  <p>Page shared by users</p>

                </div>
              </div>
              :
              <p>You are not allowed to view this page</p>
            }
          </Route>

          <Route path="/admin">
            {roles.includes("admin") ?
              <div>
                <div>
                  <h1 className="text-center">Sports</h1>
                  <div className="row mb-3">
                    <div className="col border rounded p-3 mr-3">
                      <p>Add new sport</p>
                      <AddSportForm />
                    </div>
                    <div className="col border rounded p-3">
                      <p>Edit existing sport</p>
                      <EditSportForm />
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col border rounded p-3">
                      <p>Remove sport</p>
                      <RemoveSportForm />
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-center">Teams</h1>
                  <div className="row mb-3">
                    <div className="col border rounded p-3 mr-3">
                      <p>Add new team</p>
                      <AddTeamForm />
                    </div>
                    <div className="col border rounded p-3">
                      <p>Edit existing team</p>
                      <EditTeamForm />
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col border rounded p-3">
                      <p>Remove team</p>
                      <RemoveTeamForm />
                    </div>
                  </div>
                </div>


              </div>
              :
              <p>You are not allowed to view this page</p>
            }
          </Route>
          <Route path="/both">
            {roles.includes("user") || roles.includes("admin") ?
              <p>Page shared by users and admins</p>
              :
              <p>You are not allowed to view this page</p>
            }
          </Route>
        </div>
      </div>
    </Router >
  )
}

export default App;