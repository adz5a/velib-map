import { geocode } from "./gmap";


const r1: geocode.EmptyResponse = {
    status: "ZERO_RESULTS",
    results: []
};

const r2: geocode.OKResponse = {
    status: "OK",
    results: [{
        formatted_address: "lol",
        geometry: {
            bounds: {
                northeast: {
                    lat: 2,
                    lng: 5
                },
                southwest: {
                    lat: 2,
                    lng: 5
                },
            },
            location: {
                    lat: 2,
                    lng: 5
                },
            location_type: "approximate",
            viewport: {
                northeast: {
                    lat: 2,
                    lng: 5
                },
                southwest: {
                    lat: 2,
                    lng: 5
                }
            },
        },
        place_id: "lol",
        types: "locality",
        address_components: [],
    }]
};


// fiddle 

/*
 * Illustrates that typescript does not warn for empty array in union types
 */
type EmptyOrNot = never[] | [string];

const a: EmptyOrNot = [];
const b: string = a[0];

type Union = {a: "foo" } | { a: "bar" };
// const invalid: Union = {a: "baz" };
const valid: Union = {a: "foo" };
