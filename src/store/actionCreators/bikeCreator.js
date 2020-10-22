import actions from '../actions/bikeActions'

export const addBike = (bike) => ({
    type: actions.ADD_BIKE,
    payload: bike,
});


export const unrentBike = (bike) => ({
    type: actions.UNRENT_BIKE,
    payload: bike,
});

export const rentBike = (bike, end_date) => ({
    type: actions.RENT_BIKE,
    payload: bike,
    end_date,
});

export const deleteBike = (bike) => ({
    type: actions.DELETE_BIKE,
    payload: bike,
});
