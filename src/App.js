import React from 'react';
import RoutesConfig from './routes/RoutesConfig';

// Redux
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/slices/userSlices';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (<RoutesConfig />);
}

export default App;
