import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// 'products'모든 데이터 가져오기
const getAllData = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
};

// 임의의 이름의 데이터를 문서로 저장
const addData = async (name: string, price: string, category: string) => {
  // 'products' 문서에 해당 값을 추가합니다.

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      name,
      price,
      category
    });
    alert('상품 등록 완료!');
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Firebase Storage에 이미지 저장
const uploadImage = async (image: File, key: number, productKey: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `products/${productKey}/image_${key}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllData, addData, uploadImage };
