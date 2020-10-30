import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import { CrewMember } from '../types';
import CircularProgress from '@material-ui/core/CircularProgress';

export function SuitableCrewPanel(props: {
    sortedCrews: CrewMember[];
    geoObject: any;
    loader: boolean;
}) {
    const { sortedCrews, geoObject, loader } = props;

    return (
        <div className="order-form__suitable-crew-wrapper">
            <Card className="suitable-crew__panel">
                <CardContent>
                    {!loader ? (
                        <div className="suitable-crew__content-wrapper">
                            {geoObject && sortedCrews.length > 0 ? (
                                <React.Fragment>
                                    <div className="suitable-crew__icon">
                                        <LocalTaxiIcon fontSize="large" />
                                    </div>
                                    <div>
                                        <Typography variant="subtitle1">
                                            {sortedCrews[0].car_mark}
                                        </Typography>
                                        <Typography variant="caption">
                                            {sortedCrews[0].car_color}
                                        </Typography>
                                        <Card className="suitable-crew__car-plate">
                                            <CardContent>
                                                {sortedCrews[0].car_number}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </React.Fragment>
                            ) : null}
                        </div>
                    ) : (
                        <CircularProgress />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
