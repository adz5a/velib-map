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
