import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and look in localStorage for current value
 * (if not found, defaults to `firstValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * To the component, this just acts like state that is also synced to/from
 * localStorage::
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

export const TOKEN_STORAGE_ID = "leagueone-token";

const useLocalStorage =(key, firstValue = null) => {
  const initialValue = localStorage.getItem(key) || firstValue;
  console.log("Step 2) localStorage initial value:", key);
  
  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    if (item === null) {
      console.log('item is null')
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
    console.log('Step 4) LocalStorage: Updated token');
  }, [key, item]);

  console.log("Step 3) localStorage returning:", item)
  return [item, setItem];
  
}

export default useLocalStorage;

