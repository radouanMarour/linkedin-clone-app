import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ user, children }) {
    const error = useSelector(state => state.auth.error);

    if (!user || error) {
        return <Navigate to="/login" replace />
    } else {
        return children;
    }

}

export default PrivateRoute