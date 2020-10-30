import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#ffffff',
            boxShadow: '1px 7px 9px -4px rgba(0,0,0,0.1)',
            padding: '5px 0 5px 100px',
            borderBottom: '1px solid #3f51b5',
            borderRadius: '0 0 5px 5px',
        },
        title: {
            color: 'black',
        },
    })
);

export function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" className={classes.root}>
                <Typography variant="h6" className={classes.title}>
                    Детали заказа
                </Typography>
            </AppBar>
        </div>
    );
}
