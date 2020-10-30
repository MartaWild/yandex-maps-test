import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { CrewMember } from '../types';

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            borderRadius: '5px',
        },
    })
);

export function CrewList(props: { sortedCrews: CrewMember[]; geoObject: any }) {
    const classes = useStyles();
    const { sortedCrews, geoObject } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableBody>
                    {geoObject && sortedCrews.length > 0 ? (
                        sortedCrews.map((crew) => (
                            <TableRow key={crew.crew_id}>
                                <TableCell>
                                    <div className="crew-list__row">
                                        <div className="crew-list__icon">
                                            <LocalTaxiIcon />
                                        </div>
                                        <div className="crew-list__info-wrapper">
                                            <Typography variant="subtitle1">
                                                {crew.car_mark}
                                            </Typography>
                                            <div className="crew-info">
                                                <Typography variant="caption">
                                                    {crew.car_color}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {crew.distance.toFixed(0)}{' '}
                                                    метров
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
