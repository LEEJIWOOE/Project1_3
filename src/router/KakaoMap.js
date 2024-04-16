import {Map, MapMarker, MapTypeControl, MapTypeId, ZoomControl, Polygon, MapInfoWindow} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import proj4 from 'proj4';
import "bootstrap/js/dist/collapse";
import "../css/KakaoMap.css";

function MyMap() {
    /* global kakao */
    const [traffic, setTraffic] = useState(false);
    const [mapTypeId, setMapTypeId] = useState();
    const [markers, setMarkers] = useState([]);
    const [showMarkers, setShowMarkers] = useState(false); // 새로운 상태 추가


    const [cityData, setCityData] = useState([]);

    const [map, setMap] = useState();

    const [center, setCenter] = useState({ lat: 37.558185572111356, lng: 127.00091673775184 });
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // 페이지 로드 시 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentCenter = { lat: latitude, lng: longitude };
                    setCenter(currentCenter);
                    setIsLoading(false); // 현재 위치를 가져오고 로딩 상태를 false로 변경
                },
                (err) => {
                    console.error("Error getting current position:", err);
                    setIsLoading(false); // 현재 위치를 가져오지 못하면 로딩 상태를 false로 변경
                }
            );
        } else {
            console.error("Geolocation is not supported.");
            setIsLoading(false); // 지원하지 않는 경우 로딩 상태를 false로 변경
        }
    }, []);

    useEffect(() => {
        if (map && !isLoading) {
            map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
        }
    }, [map, center, isLoading]);


    const handleMapCreate = (map) => {
        const initialCenter = new kakao.maps.LatLng(37.558185572111356, 127.00091673775184);
        map.setCenter(initialCenter);
        map.setLevel(9);
        setMap(map);
    };


    console.log(center)

// 사용자 위치로 이동하는 함수
    const moveToCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const newCenter = new kakao.maps.LatLng(latitude, longitude);
            if (map) {
                map.setCenter(newCenter);
                map.setLevel(3);
            }
        }, error => {
            console.error("Error fetching current location:", error);
            alert("현재 위치를 가져올 수 없습니다.");
        }, { enableHighAccuracy: true });
    };



    useEffect(() => {
        if (map && !isLoading) {

            map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
        }
    }, [map, center, isLoading]);

    // 교통정보 토글 함수
    const toggleTraffic = () => {
        setTraffic(!traffic);
        setMapTypeId(traffic ? null : "TRAFFIC");
    };

// 로드뷰 토글 함수
    const toggleRoadView = () => {
        setMapTypeId(mapTypeId === "ROADVIEW" ? null : "ROADVIEW");
    };

// 지형정보 토글 함수
    const toggleTerrain = () => {
        setMapTypeId(mapTypeId === "TERRAIN" ? null : "TERRAIN");
    };

// 지적편집도 토글 함수
    const toggleUseDistrict = () => {
        setMapTypeId(mapTypeId === "USE_DISTRICT" ? null : "USE_DISTRICT");
    };



    // 재활용 버튼 클릭 핸들러
    const toggleMarkers = () => {
        if (markers.length === 0) {
            // markers 상태에 마커가 없는 경우, 새로운 데이터를 가져와서 마커를 생성합니다.
            fetchData();
        } else {
            // markers 상태에 마커가 있는 경우, 마커를 토글합니다.
            setMarkers([]);
        }
        setShowMarkers(!showMarkers);
    };


    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await fetch('http://localhost:5000/city');
                if (!response.ok) {
                    throw new Error('데이터를 불러올 수 없습니다.');
                }
                const jsonData = await response.text(); // 서버에서 받은 JSON 문자열
                const firstParse = JSON.parse(jsonData); // 첫 번째 파싱으로 외부 문자열 제거
                console.log(jsonData)
                const dataObj = JSON.parse(firstParse); // 두 번째 파싱으로 실제 JSON 객체 추출

                console.log(dataObj); // 실제 데이터 구조 확인

                const utmkDef = '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs';
                const wgs84Def = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

                const transformedFeatures = dataObj.features.map(feature => ({
                    ...feature,
                    geometry: {
                        ...feature.geometry,
                        coordinates: feature.geometry.type === 'MultiPolygon' ?
                            feature.geometry.coordinates.map(polygon =>
                                polygon.map(ring =>
                                    ring.map(coord => proj4(utmkDef, wgs84Def, [coord[0], coord[1]]))
                                )
                            ) :
                            feature.geometry.coordinates.map(ring =>
                                ring.map(coord => proj4(utmkDef, wgs84Def, [coord[0], coord[1]]))
                            )
                    }
                }));

                setCityData(transformedFeatures);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
                setCityData([]);
            }
        };

        fetchCityData();
    }, []);


    const [selectedArea, setSelectedArea] = useState(null);
    const [hoverArea, setHoverArea] = useState(null);



    const handleMouseOver = (area) => {
        setHoverArea(area);
    };

    const handleMouseOut = () => {
        setHoverArea(null);
    };

    const handleClick = (area) => {
        if(selectedArea && selectedArea.properties.시군구명 === area.properties.시군구명){
            setSelectedArea(null);
        }else{
            setSelectedArea(area);
        }

    };


    // fetchData 함수를 useEffect 밖으로 이동

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/newmark');
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const jsonData = await response.json();

            const newMarkers = jsonData.map((item, index) => {
                const { 위도, 경도, 재활용센터명 } = item;
                if (!위도 || !경도) {
                    console.error('Invalid latitude or longitude:', item);
                    return null;
                }
                return (
                    <MapMarker
                        key={index}
                        position={{ lat: parseFloat(위도), lng: parseFloat(경도) }}
                        title={재활용센터명}
                    />
                );
            }).filter(marker => marker !== null);

            console.log('Markers:', newMarkers);
            setMarkers(newMarkers);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    };

    // 첫 로드시 마커 데이터 가져오기
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            className="map-con"
        >
            <Map
                center={{lat: 37.558185572111356, lng: 127.00091673775184}}
                style={{ width: "100vw",
                    height: "calc(50vh - 35px)",
                    float: "left"}}
                level={9}
                onCreate={handleMapCreate} // 지도 객체가 생성되면 setMap을 통해 상태 업데이트
            >
                <MapTypeControl position={"TOPRIGHT"}/>
                <ZoomControl position={"RIGHT"}/>
                {cityData.map((area, index) => (
                    <Polygon
                        key={index}
                        path={area.geometry.coordinates[0].map(coord => ({lat: coord[1], lng: coord[0]}))}
                        strokeWeight={3}
                        strokeColor="#004c80"
                        strokeOpacity={0.8}
                        fillColor={hoverArea === area ? "#09f" : "#fff"}
                        fillOpacity={0.7}
                        onMouseover={() => handleMouseOver(area)}
                        onMouseout={handleMouseOut}
                        onClick={() => handleClick(area)}
                    />
                ))}
                {hoverArea && (
                    <MapInfoWindow position={{
                        lat: hoverArea.geometry.coordinates[0][0][1],
                        lng: hoverArea.geometry.coordinates[0][0][0]
                    }}>
                        <div style={{width: 80, height: 30, textAlign: 'center'}}>
                            <p>{hoverArea.properties.시군구명}</p>
                        </div>
                    </MapInfoWindow>
                )}
                {selectedArea && (
                    <MapInfoWindow position={{
                        lat: selectedArea.geometry.coordinates[0][0][1],
                        lng: selectedArea.geometry.coordinates[0][0][0]
                    }}>
                        <div>
                            <h3>{selectedArea.properties.시군구명}</h3>
                            <p>Click again to close.</p>
                        </div>
                    </MapInfoWindow>
                )}

                {!isLoading && (
                    <MapMarker position={center}
                               draggable={true}
                               image={{
                                   src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                   size: {
                                       width: 24,
                                       height: 35
                                   }
                               }}>
                    </MapMarker>
                )}
                {showMarkers && markers}
                {mapTypeId && <MapTypeId type={mapTypeId}/>}
            </Map>
            <div className="map-btn">
                <ul>
                    <li><a onClick={toggleTraffic}>교통정보</a></li>
                    <li><a onClick={toggleRoadView}>로드뷰</a></li>
                    <li><a onClick={toggleTerrain}>지형정보</a></li>
                    <li><a onClick={toggleUseDistrict}>지적편집도</a></li>
                    <li><a onClick={toggleMarkers}>재활용센터</a></li>
                    <li><a onClick={moveToCurrentLocation}>내 위치</a></li>
                </ul>
            </div>
        </div>
    );
}


function AirStatus(){

    return (
        <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{
                width: "50%",
                height:"100%",
                float: "left"
            }}>
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{color:"#000"}}>Hello World!</div>
            </MapMarker>
        </Map>
    );
}

function WeatherStatus(){

    return (
        <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "50%", height:"100%" }}
        >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{color:"#000"}}>Hello World!</div>
            </MapMarker>
        </Map>
    );
}

export {AirStatus, WeatherStatus};
export default MyMap;
