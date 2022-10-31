import { combineReducers } from 'redux'

import mangaInfo from './mangaInfo'
import user from './user'

export default combineReducers({
    user,
    mangaInfo
})