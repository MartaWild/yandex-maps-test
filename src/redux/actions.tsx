import { fetchDistanceBetweenPoints, findCars } from '../api';
import { Dispatch } from 'redux';
import { ADD_CREWS_TO_STORE } from './action-types';
import { CrewMember } from '../types';

export const addCrewsToStore = (crews: CrewMember[]) => ({
    type: ADD_CREWS_TO_STORE,
    payload: {
        crews,
    },
});

export const fetchCrews = (geoObj: any) => {
    return (dispatch: Dispatch) => {
        const coordinates = geoObj.geometry.getCoordinates();
        const requestData = {
            source_time: new Date().toISOString().replace(/[-:T]|\..+/gi, ''),
            addresses: [
                {
                    address: geoObj.properties.get('name'),
                    lat: coordinates[0],
                    lon: coordinates[1],
                },
            ],
        };

        findCars(requestData).then((result) => {
            const crews = result.data.crews_info;
            const promises = crews.map((crew) => {
                return fetchDistanceBetweenPoints(
                    [crew.lat, crew.lon],
                    coordinates
                ).then((result) => {
                    return {
                        ...crew,
                        distance: result,
                    };
                });
            });
            Promise.all(promises).then((result) =>
                dispatch(addCrewsToStore(result))
            );
        });
    };
};
