export enum StreetFilter {
    STREET = "STREET",
    HOUSE = "HOUSE",
    APARTMENT = "APARTMENT"
}

export interface StreetPrefix {
    id: number;
    name: string;
    shortName: string;
}

export interface Street {
    id: string,
    prefix: StreetPrefix,
    name: string,
    cityId: number,
    nameWithPrefix: string
}