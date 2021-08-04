import {CompanyStreet} from "../types/company";
import {StreetFilter} from "../types/street";

const streetFilter =(filterType:StreetFilter,  archive: CompanyStreet[] | null, filter?: string | number) => {
    let currentNumber = 0;
    let currentString = ""
    if(archive!==null){
        switch (filterType){
            case StreetFilter.STREET:
                return  archive.filter( (item:CompanyStreet) =>{
                    if(item.streetId !== currentNumber){
                        currentNumber = item.streetId;
                        return true;
                    }else return false;
                });
            case StreetFilter.HOUSE:
                return archive.filter((item:CompanyStreet) => {
                    if(item.building === filter && currentString!==item.building) {
                        currentString = item.building;
                        return true;
                    }else return false;
                });

            case StreetFilter.APARTMENT:
                return archive.filter((item: CompanyStreet) => {
                    if(item.houseId === filter && currentString!==item.flat){
                        currentString = item.flat;
                        return true
                    }else return false;
                });
            default:
                return archive;
        }
    }else {
        return archive;
    }


}

export default streetFilter;