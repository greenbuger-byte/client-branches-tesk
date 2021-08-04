import * as siteCreators from "./siteActionCreators";
import * as companyCreators from "./companyActionCreators";

const allActionCreators = {
    ...siteCreators,
    ...companyCreators
}

export default allActionCreators;