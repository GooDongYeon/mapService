const api = {
  harbor: {
    all(callback) {
      // 서버가 없으므로 가짜 데이터를 사용함
      // 주소추가
      const harbors = [
        {
          seq: 1,
          place: '삼정타워',
          addr: '부산광역시 부산진구 중앙대로 672',
          lat: 35.152719955194,
          lng: 129.0593731551,
        },
        {
          seq: 2,
          place: '교보문고',
          addr: '부산광역시 부산진구 중앙대로 658, 1F, B1F',
          lat: 35.151521,
          lng: 129.059557,
        },
      ]
      callback({
        success: true, harbors
      })
    }
  }
}

export default api
