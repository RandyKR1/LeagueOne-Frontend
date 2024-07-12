// UserContext.js

import { createContext } from 'react';
import { TOKEN_STORAGE_ID } from '../Hooks/LocalStorage';

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export default UserContext;
