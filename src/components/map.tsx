import * as React from 'react';
import { useEffect, useRef } from 'react';
import { CrewMember } from '../types';

export function Map(props: {
    geoObject: any;
    sortedCrews: CrewMember[];
    onMapClick: (coordinates: [number, number]) => void;
}) {
    const { geoObject, sortedCrews, onMapClick } = props;

    const myMap = useRef<any>(null);

    const izhevshCenter = [56.84393062926314, 53.21041861108391];

    useEffect(() => {
        ymaps.ready(() => {
            myMap.current = new ymaps.Map('map', {
                center: izhevshCenter,
                zoom: 10,
            });

            myMap.current.events.add('click', (event: any) => {
                const coordinates = event.get('coords');
                onMapClick(coordinates);
            });
        });
    }, []);

    useEffect(() => {
        setAddressPoint(geoObject);
        setCarPoints(sortedCrews);
    }, [geoObject, sortedCrews]);

    const setAddressPoint = (geoObj: any) => {
        if (!myMap.current || !geoObj) {
            return;
        }

        myMap.current.geoObjects.removeAll();

        const placemark = new ymaps.Placemark(
            geoObj.geometry.getCoordinates(),
            {
                name: geoObject.properties.get('name'),
                balloonContent: geoObject.properties.get('name'),
            },
            {
                preset: 'islands#yellowStretchyIcon',
            }
        );
        myMap.current.geoObjects.add(placemark);
        const center = geoObj.geometry.getCoordinates();
        myMap.current.setCenter(center, 13, { duration: 1000 });
    };

    const setCarPoints = (crews: CrewMember[]) => {
        if (!myMap.current || !crews) {
            return;
        }
        crews.forEach((crew) => {
            const placemark = new ymaps.Placemark(
                [crew.lat, crew.lon],
                {
                    name: crew.car_mark,
                    balloonContent: crew.car_mark,
                },
                {
                    preset: 'islands#greenStretchyIcon',
                }
            );
            myMap.current.geoObjects.add(placemark);
        });
    };

    return (
        <div className="map-container">
            <div id="map" style={{ width: '400px', height: '400px' }} />
        </div>
    );
}
