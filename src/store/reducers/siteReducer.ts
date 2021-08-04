import {SiteActions, SiteActionTypes, SiteState} from "../../types/site";

const initialState: SiteState = {
    loadingSite: false,
    error: null
}

export const siteReducer = (state: SiteState = initialState, action: SiteActions ): SiteState  => {
    switch (action.type){
        case SiteActionTypes.LOADING:
            return {...state, loadingSite: action.payload}
        default: return {...state}
    }
}