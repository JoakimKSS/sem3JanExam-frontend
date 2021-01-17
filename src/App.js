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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  return (
    <Router>
      <div className="container">
        <ul className="nav border-bottom mb-4
        ">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sports">Sports</Link>
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
              <Link className="nav-link" to="/ext">External API demo</Link>
            </li>
            : ""
          }

        </ul>

        <Route exact path="/">
          {isLoggedIn ?
            <div>
              <UserPage roles={roles} />
              <button onClick={() => facade.logOut(setIsLoggedIn, setRoles)}>Log out</button>
            </div>
            :
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRoles={setRoles} />
          }
        </Route>
        <Route path="/sports">
          <div className="row mb-4">
            <div className="col border rounded p-3">
              <h3 className="mb-3">Sports list</h3>
              <table className="table table-bordered">
                <thead>
                  <th>id</th>
                  <th>name</th>
                  <th>description</th>
                </thead>
                <tbody>
                  <td></td>
                  <td></td>
                  <td></td>
                </tbody>
              </table>
            </div>
          </div>
        </Route>

        <Route path="/user">
          {roles.includes("user") ?
            <div className="row mb-4">
              <div className="col border rounded p-3">
                <p>Sports list</p>
                <table className="table table-bordered">
                  <thead>
                    <th>id</th>
                    <th>name</th>
                    <th>description</th>
                  </thead>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                </table>
              </div>
            </div>
            :
            <p>You are not allowed to view this page</p>
          }
        </Route>

        <Route path="/admin">
          {roles.includes("admin") ?

            <div>


              <div className="row mb-4">
                <div className="col border rounded p-3">
                  <p>Add new sport</p>
                  <AddSportForm />
                </div>
              </div>


              <div className="row mb-4">
                <div className="col border rounded p-3 mr-3">
                  <p>Add new team</p>
                  <form>
                    <div className="form-row">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Name of the sport" id="sportname" />
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Description" id="sportdesc" />
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <div className="col">
                        <button className="btn btn-secondary w-100">Add new sport</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col border rounded p-3">
                  <p>Remove team</p>
                  <form>
                    <div className="form-row">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Name of the sport" id="sportname" />
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Description" id="sportdesc" />
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <div className="col">
                        <button className="btn btn-secondary w-100">Add new sport</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            :
            <p>You are not allowed to view this page</p>
          }
        </Route>
        <Route path="/ext">
          {roles.includes("user") || roles.includes("admin") ?
            <p>External API stuff here</p>
            :
            <p>You are not allowed to view this page</p>
          }
        </Route>
      </div>
    </Router >
  )
}

export default App;
