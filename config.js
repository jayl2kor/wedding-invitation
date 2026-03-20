/**
 * 결혼식 정보 설정
 * 이 파일만 수정하면 됩니다.
 */
const CONFIG = {
  groom: {
    name: '이재준',
    description: '하늘 아래 가장 행복한 신랑',
    phone: '010-0000-0000',
    father: { name: '이OO', phone: '010-0000-0000' },
    mother: { name: '김OO', phone: '010-0000-0000' },
  },
  bride: {
    name: '김현서',
    description: '세상에서 가장 아름다운 신부',
    phone: '010-0000-0000',
    father: { name: '김OO', phone: '010-0000-0000' },
    mother: { name: '박OO', phone: '010-0000-0000' },
  },
  wedding: {
    date: '2026년 10월 9일',
    day: '금요일',
    time: '낮 12시',
    venue: '부산 윈덤그랜드 호텔',
    hall: '그랜드볼룸',
    address: '부산광역시 해운대구 해운대해변로 xxx',
    mapUrl: 'https://map.kakao.com/', // 카카오맵 링크
    naverMapUrl: 'https://map.naver.com/', // 네이버지도 링크
  },
  story: '2020년 봄, 우연히 만난 두 사람은\n서로에게 반해 사랑을 키워왔습니다.\n\n6년간의 사랑 끝에\n평생을 함께하기로 약속합니다.',
  accounts: [
    { side: '신랑측', bank: 'OO은행', number: '000-0000-0000-00', holder: '이재준' },
    { side: '신랑측 부', bank: 'OO은행', number: '000-0000-0000-00', holder: '이OO' },
    { side: '신랑측 모', bank: 'OO은행', number: '000-0000-0000-00', holder: '김OO' },
    { side: '신부측', bank: 'OO은행', number: '000-0000-0000-00', holder: '김현서' },
    { side: '신부측 부', bank: 'OO은행', number: '000-0000-0000-00', holder: '김OO' },
    { side: '신부측 모', bank: 'OO은행', number: '000-0000-0000-00', holder: '박OO' },
  ],
  // assets/photos/ 폴더에 이미지를 넣고 아래 배열에 파일명 추가
  photos: [
    // 'photo1.jpg',
    // 'photo2.jpg',
    // 'photo3.jpg',
  ],
};
