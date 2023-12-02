import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const hasPushedItem = async (uid: string, pid: string, mode: 'like' | 'basket') => {
  const fieldName = mode === 'like' ? 'likedProducts' : 'addedProducts';

  try {
    const userDocRef = doc(db, 'user_interact', uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

    // Get the current data

    if (userData && userData.likedProducts) {
      console.log('userdata', userData.likedProducts);
      const isLiked = userData.likedProducts.includes(pid);

      return isLiked;
    } else return false;
  } catch (error) {}
};

/**
 * 해당 제품의 좋아요 개수 업,다운
 * @param pid: 제품번호
 * @param state: up & down
 */
const changeProductLike = async (pid: string, state: 'up' | 'down') => {
  const productDocRef = doc(db, 'products', pid);

  try {
    // Get the current data
    const productDoc = await getDoc(productDocRef);
    const productData = productDoc.data();

    // 상품 좋아요 +1
    if (productData && state === 'up') {
      // If mode is 'up', increment the 'like' field
      const updatedLikes = (productData.like || 0) + 1;
      await updateDoc(productDocRef, { like: updatedLikes });
    } else if (productData && state === 'down' && productData.like > 0) {
      // 상품 좋아요 -1
      const updatedLikes = productData.like - 1;
      await updateDoc(productDocRef, { like: updatedLikes });
    } else {
      console.log('Invalid mode or like count already at 0');
    }
  } catch (error) {
    console.error('Error changing product like:', error);
  }
};

const changeProductState = async ({
  uid,
  pid,
  mode
}: {
  uid: string;
  pid: string;
  mode: 'add_like' | 'add_basket';
}) => {
  const fieldName = mode === 'add_like' ? 'likedProducts' : 'addedProducts';

  try {
    // Get the reference to the user document
    let userDocRef = doc(db, 'user_interact', uid);

    // Check if the user document exists
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // If the user document does not exist, create it
      await setDoc(userDocRef, { [fieldName]: [] });
    }

    // Get the current data
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

    if (userData && userData[fieldName]) {
      const isState = userData[fieldName].includes(pid);

      // Update the field based on the mode
      if (isState) {
        // If pid exists, remove it
        await updateDoc(userDocRef, {
          [fieldName]: arrayRemove(pid)
        });

        // Call changeProductLike to decrement the 'like' field
        await changeProductLike(pid, 'down');
      } else {
        // If pid does not exist, add it
        await updateDoc(userDocRef, {
          [fieldName]: arrayUnion(pid)
        });

        // Call changeProductLike to increment the 'like' field
        await changeProductLike(pid, 'up');
      }

      console.log('Toggle successful');
    } else {
      // If the field does not exist, create it with an array containing pid
      await updateDoc(userDocRef, {
        [fieldName]: [pid]
      });

      console.log('Field created with initial data');

      // Call changeProductLike to increment the 'like' field
      await changeProductLike(pid, 'up');
    }
  } catch (error) {
    console.error('Error toggling product state:', error);
  }
};
export { changeProductState, hasPushedItem, changeProductLike };
