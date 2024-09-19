import React from 'react';
import RoutesConfig from './routes/RoutesConfig';

// Redux
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/slices/userSlice';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (<RoutesConfig />);
}

export default App;
