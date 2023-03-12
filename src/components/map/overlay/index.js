const kakao = window.kakao

class KakaoOverlay {
  constructor(vueMap, content) {
    this.vueMap - vueMap
    this.content = content
    // init instance
    this.instance = new kakao.maps.Overlay({
      map: null, // 아직 올리지 않음
      clickable: false,
      content: content,
      position: null, // 나중에 클릭시

      /* 좌표 바로 위 가운데 위치 시킴 */
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3
    })
  }
  showAt(lat, lng) {
    console.log('overlay show', lat, lng)
    this.instance.setMap(this.vueMap.mapInstance)
    const pos = new kakao.maps.LatLng(lat, lng)
    this.instance.setPosition(pos)
  }
  hide() {
    this.instance.setMap(null)
  }
}

export default KakaoOverlay
