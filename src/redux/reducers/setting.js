import { SWITCH_ROLE } from '../actionTypes'

const initialState = {
    role: localStorage.getItem('role') || 'light',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SWITCH_ROLE: {
            const { role } = action.payload
            localStorage.setItem('role', role)
            return {
                ...state,
                role: role
            }
        }
        default:
            return state;
    }
}

export const switchRole = () => dispatch => {
    dispatch({ type: 'SWITCH_ROLE' })
}