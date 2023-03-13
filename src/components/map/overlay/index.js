const kakao = window.kakao

class KakaoOverlay {
  constructor(vueMap, content) {
<<<<<<< HEAD
    this.vueMap = vueMap
    this.content = content

    // init instance
    this.instance = new kakao.maps.CustomOverlay({
      map: null,
      clickable: false,
      content: content,
      position: null, // 나중에 클릭 시

      /* 좌표 바로 위에 위치*/
=======
    this.vueMap - vueMap
    this.content = content
    // init instance
    this.instance = new kakao.maps.Overlay({
      map: null, // 아직 올리지 않음
      clickable: false,
      content: content,
      position: null, // 나중에 클릭시

      /* 좌표 바로 위 가운데 위치 시킴 */
>>>>>>> c9ffb744d6b5cb0cd07efe93474e2f119e476599
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3
    })
  }
<<<<<<< HEAD

  showAt(lat, lng) {
    // console.log('show', lat, lng)
=======
  showAt(lat, lng) {
    console.log('overlay show', lat, lng)
>>>>>>> c9ffb744d6b5cb0cd07efe93474e2f119e476599
    this.instance.setMap(this.vueMap.mapInstance)
    const pos = new kakao.maps.LatLng(lat, lng)
    this.instance.setPosition(pos)
  }
<<<<<<< HEAD
=======
  hide() {
    this.instance.setMap(null)
  }
>>>>>>> c9ffb744d6b5cb0cd07efe93474e2f119e476599
}

export default KakaoOverlay
