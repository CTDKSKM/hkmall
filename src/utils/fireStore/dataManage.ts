import { FirestoreError, addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { deleteObject, getDownloadURL, getStorage, list, listAll, ref, uploadBytes } from 'firebase/storage';
import { Product } from '../../static/const/type';

// 'products'모든 데이터 가져오기
const getAllProductData = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));

    return await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const productRef = ref(storage, `products/${doc.id}`);
        const listResult = await list(productRef);
        const imgs: string[] = Array.from({ length: listResult.items.length });

        await Promise.all(
          listResult.items.map(async (imageRef, idx) => {
            const url = await getDownloadURL(imageRef);
            imgs[idx] = url;
          })
        );

        const product = {
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          category: doc.data().category,
          imgs,
          like: doc.data().like
        };

        return product;
      })
    );
  } catch (error) {
    throw error;
  }
};
const getUserLikes = async (uid: string, mode: 'like' | 'basket'): Promise<Product[]> => {
  try {
    const userInteractDocRef = doc(db, 'user_interact', uid);
    const userInteractDocSnapshot = await getDoc(userInteractDocRef);

    if (userInteractDocSnapshot.exists()) {
      const value = mode === 'like' ? 'likedProducts' : 'addedProducts';

      const likeList = userInteractDocSnapshot.data()?.[value] || [];
      console.log('User Likes:', likeList);

      const productList = await Promise.all(
        likeList.map(async (pid: string) => {
          const productDocRef = doc(db, 'products', pid);
          const productDocSnapshot = await getDoc(productDocRef);

          if (productDocSnapshot.exists()) {
            const listResult = await listAll(ref(storage, `products/${pid}`));
            const imgs: string[] = await Promise.all(
              listResult.items.map(async (imageRef) => getDownloadURL(imageRef))
            );

            return {
              id: pid,
              name: productDocSnapshot.data().name,
              price: productDocSnapshot.data().price,
              category: productDocSnapshot.data().category,
              imgs,
              like: productDocSnapshot.data().like
            };
          } else {
            console.log(`Product with ID ${pid} does not exist.`);
            return null;
          }
        })
      );

      const filteredProductList = productList.filter((product) => product !== null);
      console.log('Product List:', filteredProductList);
      return filteredProductList;
    } else {
      console.log('User document does not exist.');
      return [];
    }
  } catch (error) {
    console.error('Error getting user likes:', error);
    return [];
  }
};

// 임의의 이름의 데이터를 문서로 저장
const addProduct = async (name: string, price: string, category: string, like: number): Promise<string> => {
  // 'products' 문서에 해당 값을 추가합니다.

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      name,
      price,
      category,
      like
    });
    alert('상품 등록 완료!');
    return docRef.id;
  } catch (error) {
    throw error;
  }
};
//

const deleteProduct = async (id: string) => {
  try {
    //storage에서 이미지 삭제
    const productRef = ref(storage, `products/${id}`);
    const listResult = await list(productRef);
    const deleteFilePromises = listResult.items.map((imgRef) => deleteObject(imgRef));

    //firestore에서 문서 삭제
    const deleteProduct = deleteDoc(doc(db, 'products', id));

    await Promise.all(deleteFilePromises.concat([deleteProduct]));

    alert('삭제완료!');
  } catch (error) {
    throw error;
  }
};

// Firebase Storage에 이미지 저장
const uploadImage = async (image: File, key: number, productId: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `products/${productId}/image_${key}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllProductData, getUserLikes, addProduct, deleteProduct, uploadImage };
