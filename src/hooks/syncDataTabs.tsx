import {useEffect} from 'react';
import { useStore } from './dataStore';

/**
 * Hook personnalisé pour synchroniser l'état du store Zustand
 * entre différents onglets du navigateur en temps réel.
 * Il écoute les changements dans le localStorage et force la re-hydratation du store.
 * @param storageKey La clé utilisée par le middleware persist de Zustand dans localStorage.
 */

export const useSyncDataTabs = (storageKey:string) => {

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === storageKey) {

        console.log(`Changement détecté pour la clé '${storageKey}' dans localStorage par un autre onglet. Re-hydratation forcée du store.`);
    
        useStore.persist.rehydrate();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey]); // Le hook dépend de storageKey, mais comme c'est une constante, il ne s'exécute qu'une fois.
};


