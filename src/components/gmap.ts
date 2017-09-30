declare var global: any;


export interface LatLng {
    lat: number;
    lng: number;
}

// https://developers.google.com/maps/documentation/javascript/3.exp/reference#MVCObject 
/*
 * E: events type, union type for map instances
 */
export interface MVCObject<E> {
    addListener <E extends MVCEvent> (event: E["name"], handler: EventHandler<E>): MVCEventSub;
}
export interface MVCEvent {
    name: string;
    // stores the "shape" of the event
    value: any;
}
export interface MVCEventSub {
    remove(): void;
}
export interface EventHandler<E extends MVCEvent> {
    (e: E["value"]): void;
}


/*
 * Namespace declared and injected by the gmap library
 * Reexported at the bottom of this file
 *
 *
 */
declare namespace google {
    export namespace maps {
        export interface IMap {
            new (elem: HTMLElement, options: MapOptions): MapInstance
        }
        export interface MapOptions {
            zoom: number;
            center: LatLng;
        }

        export namespace events {
            export type names = "center_changed" | "click" | "idle";
            export interface Event extends MVCEvent {
                name: names;
            }
            export interface MouseEvent {
                stop(): void;
                latLng: LatLng;
            }
            export interface Click extends Event {
                name: "click";
                value: MouseEvent;
            }
            export interface CenterChanged extends Event {
                name: "center_changed";
                value: undefined;
            }
            export interface Idle extends Event {
                name: "idle";
                value: undefined;
            }
            export type Events = Click | CenterChanged;
        }


        export interface MapInstance extends MVCObject<events.Events> {
        }




        export const Map: IMap;

    }
}

global.launchMap = () => {
    console.log("init");
    console.log(google.maps);
    
}

export { google };
