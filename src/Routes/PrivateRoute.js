import {Redirect, BrowserRouter as Route} from "react-router-dom";
import React  from 'react';

const PrivateRoute = ({childern , ...rest}) => {
    return (
      <Route
          {...rest}
          render ={({location}) =>
              location.getItem("ACCESS_TOKEN") ? (childern) : (
                  <Redirect
                      to={{
                          pathname: "/login",
                          state: {from: location}
                      }}
                  />
              )
          }
        />
    );
}

export default PrivateRoute;