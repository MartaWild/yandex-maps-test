import { SearchRequest } from './types';

const fakeServerResponse = {
    code: 0,
    descr: 'OK',
    data: {
        crews_info: [
            {
                crew_id: 123,
                car_mark: 'Chevrolet',
                car_model: 'Lacetti',
                car_color: 'синий',
                car_number: 'Е234КУ',
                driver_name: 'Деточкин',
                driver_phone: '7788',
                lat: 56.855532,
                lon: 53.217462,
                distance: 300,
            },
            {
                crew_id: 125,
                car_mark: 'Hyundai',
                car_model: 'Solaris',
                car_color: 'белый',
                car_number: 'Ф567АС',
                driver_name: 'Петров',
                driver_phone: '8899',
                lat: 56.860581,
                lon: 53.209223,
                distance: 600,
            },
            {
                crew_id: 127,
                car_mark: 'Hyundai',
                car_model: 'Solaris',
                car_color: 'черный',
                car_number: 'А767БА',
                driver_name: 'Иванов',
                driver_phone: '7755',
                lat: 56.84668279864637,
                lon: 53.226112637845524,
                distance: 100,
            },
        ],
    },
};

export const findCars = (data: SearchRequest) => {
    return new Promise<typeof fakeServerResponse>((resolve, reject) => {
        setTimeout(() => {
            resolve(fakeServerResponse);
        }, 1000);
    });
};

export const fetchDistanceBetweenPoints = (
    a: string | [number, number],
    b: string | [number, number]
): Promise<number> => {
    return new Promise((resolve, reject) => {
        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: [a, b],
                params: {
                    avoidTrafficJams: true,
                },
            },
            {
                boundsAutoApply: true,
            }
        );

        multiRoute.model.events.add('requestsuccess', function () {
            const activeRoute = multiRoute.getActiveRoute();
            if (!activeRoute || !activeRoute.properties.get('distance')) {
                reject();
            } else {
                resolve(activeRoute.properties.get('distance').value);
            }
        });
    });
};
