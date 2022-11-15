import React from 'react';
// Redux
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/features/authSlice';

const AdminRoute = ({children}) => {
  const adminEmail = useSelector(selectEmail);

  if(adminEmail === 'admin@admin.com'){
    return children;
  } else {
    return null
  }
}

export default AdminRoute