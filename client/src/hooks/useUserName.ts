import { useState } from 'react';

import { UseUserNameReturnType } from './types';

const nameLSKey = 'username';

export default function useUserName(): UseUserNameReturnType {
  const [name, setName] = useState(localStorage.getItem(nameLSKey) || '');

  const updateName = (newName: string) => {
    localStorage.setItem(nameLSKey, newName);
    setName(newName);
  };

  return { name, updateName };
}
