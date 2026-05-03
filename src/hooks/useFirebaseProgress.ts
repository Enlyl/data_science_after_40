import { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useAuth } from '../context/AuthContext';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const useFirebaseProgress = () => {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      let userSnap;
      try {
        userSnap = await getDoc(userRef);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        setLoading(false);
        return;
      }

      if (userSnap.exists()) {
        const data = userSnap.data();
        setXp(data.xp || 0);
        setLevel(data.level || 1);
        setCompletedLessons(data.completedLessons || []);
      } else {
        // Initialize new user
        try {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || null, // Ensure not undefined
            photoURL: user.photoURL || null,       // Ensure not undefined
            xp: 0,
            level: 1,
            completedLessons: [],
            streak: 0,
            lastActive: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}`);
        }
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user]);

  const addExperience = async (amount: number) => {
    if (!user) return;
    const newXp = xp + amount;
    const newLevel = Math.floor(newXp / 500) + 1;
    
    setXp(newXp);
    setLevel(newLevel);

    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        xp: newXp,
        level: newLevel,
        lastActive: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const completeLesson = async (lessonId: string, earnedXp: number) => {
    if (!user || completedLessons.includes(lessonId)) return;

    const newXp = xp + earnedXp;
    const newLevel = Math.floor(newXp / 500) + 1;
    const newCompleted = [...completedLessons, lessonId];
    
    setCompletedLessons(newCompleted);
    setXp(newXp);
    setLevel(newLevel);
    
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        completedLessons: arrayUnion(lessonId),
        xp: newXp,
        level: newLevel,
        lastActive: serverTimestamp()
      });

      // Also record in progress subcollection
      const progressRef = doc(db, 'users', user.uid, 'progress', lessonId);
      await setDoc(progressRef, {
        userId: user.uid,
        lessonId,
        completedAt: serverTimestamp(),
        xpEarned: earnedXp
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  const resetProgress = async () => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        xp: 0,
        level: 1,
        completedLessons: [],
        streak: 0,
        lastActive: serverTimestamp()
      });
      setXp(0);
      setLevel(1);
      setCompletedLessons([]);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  return { xp, level, completedLessons, loading, addExperience, completeLesson, resetProgress };
};
