export type CrewMember = {
    crew_id: number;
    car_mark: string;
    car_model: string;
    car_color: string;
    car_number: string;
    driver_name: string;
    driver_phone: string;
    lat: number;
    lon: number;
    distance: number;
};

export type State = {
    crews: CrewMember[];
};

export type SearchRequest = {
    source_time: string;
    addresses: {
        address: string;
        lat: number;
        lon: number;
    }[];
};
