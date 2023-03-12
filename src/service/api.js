const api = {
  harbor: {
    all(callback) {
      // 서버가 없으므로 가짜 데이터를 사용함
      const harbors = [
        {
          seq: 1,
          place: '삼정타워',
          addr: '부산광역시 서면',
          lat: 35.152719955194,
          lng: 129.0593731551,
        },
        {
          seq: 2,
          place: '동남유통',
          addr: '부산광역시 서면',
          lat: 35.162719955194,
          lng: 129.0593731551,
        },
      ]
      callback({
        success: true, harbors
      })
    }
  }
}

export default api
