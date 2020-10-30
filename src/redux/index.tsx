import { State, CrewMember } from '../types';
import { ADD_CREWS_TO_STORE } from './action-types';
import * as actions from './actions';

type ActionType = Extract<
    ReturnType<typeof actions[keyof typeof actions]>,
    { type: string }
>;

const initialState: State = {
    crews: [] as CrewMember[],
};

export const rootReducer = (
    state = initialState,
    action: ActionType
): typeof initialState => {
    switch (action.type) {
        case ADD_CREWS_TO_STORE: {
            return {
                ...state,
                crews: action.payload.crews,
            };
        }
        default:
            return state;
    }
};
