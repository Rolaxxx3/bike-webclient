import actions from '../actions/bikeActions'
import moment from 'moment'

function bikesReducer(state = [], action) {
    switch(action.type) {
        case actions.ADD_BIKE: {
            const { payload } = action;
            return [
                ...state,
                {
                    rent: {
                        end_date: payload.rent.end_date || Date.now(),
                        start_date: payload.rent.start_date || Date.now(),
                        price: payload.rent.price || 0,
                    },
                    name: payload.name,
                    type: payload.type,
                    _id: payload._id,
                }
            ]
        }

        case actions.UNRENT_BIKE: {
            const { payload } = action;
            return state.map(bike => {
                if (bike._id === payload._id) {
                    return {
                        ...bike,
                        rent: {
                            ...bike.rent,
                            end_date: bike.rent.start_date,
                            price:
                                (moment(payload.rent.end_date).diff(moment(payload.rent.start_date, 'hours')) > 20) ?
                                bike.rent.price * 2 :
                                bike.rent.price
                        }
                    }
                }
                return bike;
            });
        }

        case actions.RENT_BIKE: {
            const { payload } = action;
            return state.map(bike => {
                if (bike._id === payload._id) {
                    return {
                        ...bike,
                        rent: {
                            ...bike.rent,
                            end_date: action.end_date,
                            start_date: moment().toISOString(),
                            price: Number(payload.rent.price),
                        }
                    }
                }
                return bike;
            });
        }

        case actions.DELETE_BIKE: {
            const { payload } = action;
            return state.filter(bike => {
                if (bike._id === payload._id) {
                    return null;
                }
                return bike;
            });
        }

        default: return state;
    }
}


export default bikesReducer;
