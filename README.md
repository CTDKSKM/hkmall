# ``HK MALL`` :tshirt:


## 프로젝트 소개

다양한 옷을 구매할 수 있는 이커머스 옷 쇼핑몰 사이트입니다.

**배포 링크**: https://hkmall-one.vercel.app/

<br/><br/>

## :boxing_glove: 개발기간

**(23.11.20~23.12.05)**

<br/><br/>

## :sunflower: Stacks

### Version Control
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white) ![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Front-End
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

### Back-End
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>

### Deployment
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

<br/><br/>

## 서비스 아키텍처
<img src="https://firebasestorage.googleapis.com/v0/b/ts-hk-mall.appspot.com/o/etc%2Farchitecture%2Fhkmall%20Architecture.png?alt=media&token=7fbda361-3ed2-4f4d-9a57-c547e1a7a280"/>


<br/><br/>

## 화면 구성


| 작업                                       | 미리보기                           |
| ------------------------------------------ | ----------------------------- |
| **메인 페이지**                           |  ![메인페이지](https://github.com/CTDKSKM/hkmall/assets/69897998/1e8a4f2a-8985-4b70-a02f-a016a6e3caab)|
| **로그인 페이지**                         |  ![로그인페이지](https://github.com/CTDKSKM/hkmall/assets/69897998/ed88940f-47d3-450a-ba96-04ab0cf0346a)|
| **장바구니 추가**                         |  ![장바구니](https://github.com/CTDKSKM/hkmall/assets/69897998/f0ec0c51-bbac-4916-b3df-eacbd11c72b4)|
| **장바구니 & 좋아요 품목 삭제**        |    ![삭제](https://github.com/CTDKSKM/hkmall/assets/69897998/7788409b-cf5c-40e7-94ff-91d6ad25d373)|
| **제품 등록(관리자 전용)**                |  ![제품 추가](https://github.com/CTDKSKM/hkmall/assets/69897998/7581df85-e702-4340-baf1-5c419dad1ee7) |

---

<br/><br/>

## :partying_face: 주요 기능

### 메인페이지

- FireStore Dababase와 Storage에서 사진과 제품 정보를 가져옵니다.
- 카테고리별로 데이터를 나눠서 품목을 볼 수 있습니다.

### 상세 페이지

- 상세 제품 정보를 볼 수 있습니다.
- 로그인한 현재 회원이 좋아요, 장바구니로 제품의 상태에 영향을 줍니다.


### 좋아요, 장바구니 페이지

- 좋아요 및 장바구니 추가한 제품을 확인하고 삭제할 수 있습니다.


### 관리자 페이지

- 관리자 권한이 있는 회원으로 로그인 시, /admin 으로 들어갈 수 있습니다. 제품을 관리할 수 있는 페이지입니다.
- 제품을 등록하면 해당 제품의 정보를 Firebase 백앤드에 저장합니다.

### 소셜 로그인

- 구글, 페이스북으로도 회원 가입 및 로그인 가능합니다.

- 관리자 권한이 있는 회원으로 로그인 시, /admin 으로 들어갈 수 있습니다. 제품을 관리할 수 있는 페이지입니다.
- 제품을 등록하면 해당 제품의 정보를 Firebase 백앤드에 저장합니다.

<br/><br/>

## :sunglasses:주요 파일 및 폴더

#### 📜 useProductQuery.tsx, useUserLikeQuery.tsx: 유저가 상품에 대한 상호작용을 react-query문으로 제어할 수 있는 파일들입니다.
#### 📜Router.tsx: 사용할 때 페이지를 이동할 때 필요한 라이브러리가 담긴 파일입니다.
#### 📜firebase.ts: Firebase 환경 설정 파일입니다.
#### 📜dataManage.ts: DB에 담긴 전체 상품 데이터와 유저의 좋아요, 장바구니 리스트를 가져오는 비동기 함수들이 있습니다.
#### 📜ProductDetailPage.ts: 제품의 상세 정보들을 가져오고 좋아요, 장바구니 유무에 따라 정보를 관리 해줍니다.
#### 📜GoogleLoginButton.ts: 인증 정보를 통해 구글 로그인 관리를 해줍니다.


<br/><br/>

<br/><br/>
