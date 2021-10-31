import { Redirect, Route } from "react-router";
import { useDataContext } from "../context/DataContext";

const Privateroute = ({ children, ...rest }) => {
  const { user } = useDataContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Privateroute;
