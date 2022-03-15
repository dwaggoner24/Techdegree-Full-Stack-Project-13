import {useEffect} from 'react';
import { Link } from 'react-router-dom';

//removes the authenticated user and password from global state

export default function UserSignOut ({context}) {

  useEffect(() => context.actions.signOut());

  return (
    <Link to="/" />
  );
}