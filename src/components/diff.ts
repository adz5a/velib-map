




export class Prop<P extends {}, K extends keyof P, T extends P[K]> {

    public currentValue: T;

    constructor ( 
        private propName: K,
        private isEqual: ( prev: T, next: T ) => boolean) {
    }

    init ( props: P ) {
        this.currentValue = props[this.propName];
    }

    update ( props: any ) {
        const newProp = props[this.propName];
        const didChange = !this.isEqual(this.currentValue, newProp);
    }
}
