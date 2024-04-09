/*eslint-disable*/
import './App.css';


function Login() {
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
  return (
      <div className="App">
          <div id="map" style="width:100%;height:350px;"></div>

          <script type="text/javascript"
                  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4755be2274b0f534aae434a5dfe21164"></script>
          <script>
              {mapOption}
              // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
              var map = new kakao.maps.Map(mapContainer, mapOption);
          </script>
          <p>test</p>
      </div>

  );
}


export default App;
