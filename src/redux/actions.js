import { SWITCH_ROLE } from './actionTypes'

export const switchTheme = role => ({
    type: SWITCH_ROLE,
    payload: { role }
})