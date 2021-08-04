import {Dispatch} from "redux";
import {SiteActions, SiteActionTypes} from "../../types/site";

export const loadSiteActionCreator = (status: boolean)=>(dispatch: Dispatch<SiteActions>):void=>{
    dispatch({type: SiteActionTypes.LOADING, payload: status});
}

