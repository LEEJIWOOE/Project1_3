import {Map, MapMarker, MapTypeControl, MapTypeId, ZoomControl, Polygon, MapInfoWindow} from "react-kakao-maps-sdk";
import React, { useEffect, useState } from "react";
import proj4 from 'proj4';
import "bootstrap/js/dist/collapse";
import "../css/KakaoMap.css";
import collapse from "bootstrap/js/src/collapse";


function MyMap({selectedSido, sidos, zeroWastes, selectZeroWaste }) {
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
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 } // 고정확도 활성화, 10초 타임아웃, 1분 최대 캐시 나이
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

    const [allData, setAllData] = useState([]); // 전체 데이터
    const [displayData, setDisplayData] = useState([]); // 화면에 표시할 데이터

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/zero');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setAllData(jsonData); // 전체 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


// 시도 선택 핸들러
    useEffect(() => {
        // 시도 선택에 따른 마커 표시
        if (selectedSido && allData.length > 0) {
            const filteredData = allData.filter(item => item.시도 === selectedSido);
            setDisplayData(filteredData);
        } else {
            setDisplayData([]);  // 선택이 해제되면 마커 데이터를 비웁니다.
        }
    }, [selectedSido, allData]);


    // 제로웨이스트샵
    const [wasteAll, setwasteAll] = useState([]);
    const [wasteMarker, setWasteMarker] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/places')
            if (!response.ok) {
                throw new Error('에러남..;;')
            }
            const jsonData = await response.json();
            setwasteAll(jsonData);
        } catch (error) {
            console.log('제로웨이스트에러');
        }
    };
        fetchData();
    }, []);

    const categoryRules = {
        제로마켓: name => /(남원점|신구로점)/.test(name),
        서울: name => name.startsWith('서울'),
        경기: name => /(고양|광명|김포|남양주|부천|분당|성남|수원|시흥|오산|용인|파주|평택|하남|화성)/.test(name),
        인천: name => name.startsWith('인천'),
        강원도: name => /(강릉|원주|춘천)/.test(name),
        충청도: name => /(논산|대전|천안|태안|청주)/.test(name),
        경상도: name => /(경주|구미|김천|김해|대구|부산|안동|양산|울산|진주|창원|통영)/.test(name),
        전라도: name => /(광주|군산|나주|담양|순천|목포|전주)/.test(name),
        제주도: name => name.startsWith('제주'),
        // 나머지 카테고리에 대해서도 비슷한 규칙을 추가합니다.
    };

    useEffect(() => {
        // 제로 웨이스트 카테고리 선택에 따른 마커 표시
        if (selectZeroWaste && wasteAll.length > 0) {
            const matchingRule = categoryRules[selectZeroWaste];
            if (matchingRule) {
                const filterWaste = wasteAll.filter(item => matchingRule(item.name));
                setWasteMarker(filterWaste);
            }
        } else {
            setWasteMarker([]);  // 선택이 해제되면 마커 데이터를 비웁니다.
        }
    }, [selectZeroWaste, wasteAll]);

    return (
        <div
            className="map-con"
        >
            <Map
                center={center}
                className="Map"
                level={9}
                onCreate={handleMapCreate} // 지도 객체가 생성되면 setMap을 통해 상태 업데이트
            >
                <MapTypeControl position={"TOPRIGHT"}/>
                <ZoomControl position={"RIGHT"}/>

                {/*서울지도표시*/}
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

                {/*내위치마커*/}
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

                {/*재활용센터 마커*/}
                {showMarkers && markers}

                {/*로드뷰, 지형뷰등*/}
                {mapTypeId && <MapTypeId type={mapTypeId}/>}

                {/*네프론 마커*/}
                {displayData.map((item, index) => (
                    <MapMarker
                        key={index}
                        position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                        title={item.name}
                    />
                ))}
                {/*제로웨이스트 마커*/}
                {wasteMarker.map((item, index) => (
                    <MapMarker
                    key={index}
                    position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                    title={item.name}
                    />
                ))}
            </Map>
            <div className="map-btn">
                <ul>
                    <button onClick={toggleTraffic}>교통정보</button>
                    <button onClick={toggleRoadView}>로드뷰</button>
                    <button onClick={toggleUseDistrict}>지적편집도</button>
                    <button onClick={toggleMarkers}>재활용센터</button>
                    <button onClick={moveToCurrentLocation}>내 위치</button>
                </ul>
            </div>
        </div>
    );
}


export default MyMap;
