import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserBoared from "./components/UserBoared";
import NotebookComponent from "./components/UserBoared/Notebook";
import NotesComponent from "./components/UserBoared/Notes";
import SelectedNotesComponent from "./components/UserBoared/SelectedNotes";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user)

  let sessionRoutes;
  if (sessionUser) {
    sessionRoutes =(
      <>
      <Redirect exact to={`/${sessionUser.id}`} />
      <Route path={`/${sessionUser.id}`}>
        <UserBoared />
      </Route>
      <Switch>
      <Route exact path='/:id/Notebooks'>
        <NotebookComponent />
      </Route>
      <Route path='/:id/notes'>
        <NotesComponent />
      </Route>
      <Route exact path='/:id/notebooks/:id'>
        <SelectedNotesComponent />
      </Route>
    </Switch>
      </>
    )
  } else {
    sessionRoutes = (
      <Switch>
          <Route exact path='/'>
          <Navigation isLoaded={isLoaded} />
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    )
  }

  return (
    <>
      {isLoaded && sessionRoutes}
    </>
  );
}

export default App;
