import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { Map } from './map';
import { SuitableCrewPanel } from './suitable-crew-panel';
import { CrewList } from './crew-list';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrewMember, State } from '../types';
import { fetchCrews } from '../redux/actions';

const compareCrewMembers = (elementA: CrewMember, elementB: CrewMember) => {
    const dateA = elementA.distance;
    const dateB = elementB.distance;
    return dateA - dateB;
};

const SubmitButton = withStyles({
    root: {
        width: '300px',
        marginBottom: '15px',
    },
})(Button);

export function OrderForm() {
    const [address, setAddress] = useState('');
    const [geoObject, setGeoObject] = useState<any>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const crews = useSelector((state: State) => state.crews);
    const dispatch = useDispatch();
    const sortedCrews = crews.slice();

    sortedCrews.sort(compareCrewMembers);

    const search = (searchBy: string | [number, number]) => {
        const izhevskBounds = [
            [56.719167703511616, 52.72702017358389],
            [56.968277417188766, 53.69381704858389],
        ];

        ymaps
            .geocode(searchBy, {
                boundedBy: izhevskBounds,
            })
            .then((result: any) => {
                const addressGeoObject = result.geoObjects.get(0);
                if (addressGeoObject) {
                    setGeoObject(addressGeoObject);
                    setAddress(addressGeoObject.properties.get('name'));
                    dispatch(fetchCrews(addressGeoObject));
                    setError(false);
                } else {
                    setError(true);
                }
                setLoading(false);
            });
    };

    const searchByText = (text: string) => {
        text = text.trim();
        if (!text) {
            setError(true);
            setLoading(false);
            return;
        }

        setLoading(true);

        search(text);
    };

    const onMapClick = (coordinates: [number, number]) => {
        setLoading(true);

        search(coordinates);
    };

    const onSubmitClick = () => {
        searchByText(address);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        setError(false);
        if (event.key === 'Enter') {
            searchByText(address);
        }
    };

    return (
        <div className="order-form-wrapper">
            <div className="order-form__from-wrapper">
                <TextField
                    id="standard-basic"
                    label="Откуда"
                    className="order-form__from-input"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    onKeyDown={onKeyDown}
                    helperText={
                        error || !geoObject ? 'Адрес введен неверно' : null
                    }
                    error={error}
                />
            </div>
            <SuitableCrewPanel
                sortedCrews={sortedCrews}
                geoObject={geoObject}
                loader={loading}
            />
            <div className="map-crew-container">
                <div>
                    <Map
                        geoObject={geoObject}
                        sortedCrews={sortedCrews}
                        onMapClick={onMapClick}
                    />
                </div>
                <div className="map-crew__crew-list">
                    <CrewList sortedCrews={sortedCrews} geoObject={geoObject} />
                </div>
            </div>
            <div className="order-form__submit-button">
                <SubmitButton
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={onSubmitClick}
                    disabled={error}
                >
                    Заказать
                </SubmitButton>
            </div>
        </div>
    );
}
