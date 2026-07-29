import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { menuData as defaultMenuData } from './data/menuData';

interface MenuContextType {
  menuData: any[];
  loading: boolean;
}

const MenuContext = createContext<MenuContextType>({ menuData: defaultMenuData, loading: true });

export const useMenu = () => useContext(MenuContext);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuData, setMenuData] = useState<any[]>(defaultMenuData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const docRef = doc(db, 'settings', 'menu');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().items) {
          setMenuData(docSnap.data().items);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
      setLoading(false);
    };

    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menuData, loading }}>
      {children}
    </MenuContext.Provider>
  );
};
