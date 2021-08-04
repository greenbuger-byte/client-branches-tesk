export enum SiteActionTypes {
    LOADING = "SITE.LOADING",
    ERROR = "SITE.ERROR"
}
export interface SiteError {
    messages: string[]
}
export interface SiteState {
    loadingSite: boolean,
    error: SiteError | null
}

interface loadingSiteAction {
    type: SiteActionTypes.LOADING;
    payload: boolean
}

interface setErrorSiteAction {
    type: SiteActionTypes.ERROR;
    payload: string
}
export type SiteActions = loadingSiteAction | setErrorSiteAction;