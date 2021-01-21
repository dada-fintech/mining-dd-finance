import { SWITCH_NETWORK } from '../actionTypes'
import config from 'config'

const initialState = {
    network: localStorage.getItem('network') || config.default,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SWITCH_NETWORK: {
            const { network } = action.payload
            localStorage.setItem('network', network)
            return {
                ...state,
                network: network
            }
        }
        default:
            return state;
    }
}

export const switchNetwork = () => dispatch => {
    dispatch({ type: 'SWITCH_NETWORK' })
}