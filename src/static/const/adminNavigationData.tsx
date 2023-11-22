import ProductManage from '../../components/AdminPage/ProductManage/ProductManage';

export const ADMIN_NAVIGATION_DATA = [
  {
    name: 'basic',
    values: [
      { name: 'dashboard', component: <ProductManage /> },
      { name: 'overview', component: <ProductManage /> },
      { name: 'home', component: <ProductManage />, action: true }
    ]
  },
  {
    name: 'management',
    values: [
      { name: '상품 관리', component: <ProductManage /> },
      { name: '광고 관리', component: <ProductManage /> },
      { name: '환경설정', component: <ProductManage /> }
    ]
  },
  {
    name: 'resource',
    values: [
      { name: '고객지원', component: <ProductManage /> },
      { name: '통계', component: <ProductManage /> }
    ]
  }
];
