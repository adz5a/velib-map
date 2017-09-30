import * as React from "react";
import { google } from "./gmap";

export interface WithRef {
    getRef(ref: HTMLElement): void;
    container: HTMLElement;
}

export interface Props {
    // onCenterChanged (e: ): void;
}

export class Map extends React.Component implements WithRef {

    getRef: (ref: HTMLElement) => void;
    container: HTMLElement;

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
        console.log(this.container);
        const map = new google.maps.Map(this.container, {
            center: {
                lat: -25.363,
                lng: 131.044
            },
            zoom: 3
        });
        const sub = map.addListener("center_changed", () => {
            console.log("lol");
            sub.remove();
        });
    }

}
