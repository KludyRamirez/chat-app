import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import toast, { Toaster } from 'react-hot-toast';
import { default as axios } from './api';
import Login from './pages/Login';
import Register from './pages/Register';
import Loading from './components/utils/Loading';

const selectAuth = (state) => state.auth.userDetails;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AppRoutes = ({ auth, setLoading, toast, axios }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login axios={axios} setLoading={setLoading} toast={toast} />}
      />
      <Route
        path="/register"
        element={
          <Register axios={axios} setLoading={setLoading} toast={toast} />
        }
      />
      {/* <Route path="/error" element={<Error />} />
      <Route
        path="/forgot"
        element={<Forgot setLoading={setLoading} toast={toast} axios={axios} />}
      />
      <Route
        path="/reset-password/:id/:token"
        element={<Reset setLoading={setLoading} toast={toast} axios={axios} />}
      /> */}
    </Routes>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector(authSelector);

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: '500',
            textAlign: 'center',
            border: '1px solid #606060',
            backgroundColor: 'white',
          },
        }}
      />
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <AppRoutes
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
          />
        )}
      </Router>
    </>
  );
};

export default App;
