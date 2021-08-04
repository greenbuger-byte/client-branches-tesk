import {combineReducers} from "redux";
import {companyReducer} from "./companyReducer";
import {siteReducer} from "./siteReducer";

export const rootReducer = combineReducers({
    company: companyReducer,
    site: siteReducer
});

export type RootState = ReturnType<typeof rootReducer>;