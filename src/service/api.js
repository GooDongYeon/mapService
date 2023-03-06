const api = {
  harbor: {
    all(callback) {
      // 서버가 없으므로 가짜 데이터를 사용함
      const harbors = [
        {
          seq: 1,
          place: '삼정타워',
          lat: 35.152719955194,
          lng: 129.0593731551,
        }
      ]
      callback({
        success: true, harbors
      })
    }
  }
}

export default api
