import * as React from "react";
import { google, LatLng } from "./gmap";

export interface WithRef {
    getRef(ref: HTMLElement): void;
    container: HTMLElement;
}

export interface Props {
    // onCenterChanged (e: ): void;
    draggable?: boolean;
    center?: LatLng;
    mapCenter?: LatLng;
    zoom: number;
}

const hasOwn = (o: Object, prop: string): boolean => o.hasOwnProperty(prop);

export class Map extends React.Component<Props> implements WithRef {

    getRef: (ref: HTMLElement) => void;
    container: HTMLElement;
    private map: google.maps.MapInstance;

    componentWillMount () {
        this.getRef = ( ref: HTMLElement ) => {
            this.container = ref;
        }
    }

    render () {
        return (
            <section className="w5 h5 ba" ref={this.getRef}>
            </section>
        );
    }

    componentDidMount () {

        const hasMapCenter = hasOwn(this.props, "mapCenter");
        const hasCenter = hasOwn(this.props, "center");
        let center: LatLng;
        if ( hasMapCenter || hasCenter ) {
            if ( hasMapCenter && hasCenter ) {
                console.warn("mapCenter & center provided, center will be discarded and map is not draggable");
                center = this.props.mapCenter as LatLng;
            } else if ( hasMapCenter ) {
                center = this.props.mapCenter as LatLng;
            } else {
                center = this.props.center as LatLng;
            }
        } else {
            throw new Error("Missing center / mapCenter prop");
        }

        if (!hasOwn(this.props, "zoom")) {
            throw new Error("Missing zoom prop");
        }

        this.map = new google.maps.Map(this.container, {
            center,
            zoom: this.props.zoom,
            draggable: this.props.draggable !== false
        });


    }

}
