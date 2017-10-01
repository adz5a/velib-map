const isObject = ( o: any): boolean => ( o !== null && typeof o === "object" );
const hasOwn = ( o: Object, propName: string ) => o.hasOwnProperty(propName);




export interface InitResult<T> {
    hasProp: boolean;
    value?: T;
}
export const init = <T extends {}, K extends keyof T, V extends T[K]> ( 
    propName: K,
    props: T
): InitResult<V> => {


    const hasProp = isObject(props) && hasOwn(props, propName);
    
    return {
        hasProp,
        value: hasProp ? props[propName] : undefined
    };


};


const tripleEq = ( a: any, b: any ): boolean => a === b;
export interface ChangeResult<T> {
    hasProp: boolean;
    didChange: boolean;
    value: T | undefined;
    previousValue: T | undefined;
    appeared: boolean;
    removed: boolean;
}
export const change = <T extends {}, K extends keyof T, V extends T[K]>(
    propName: K,
    prevProps: T,
    nextProps: T,
    diff: (previous: T, next: T) => boolean = tripleEq
): ChangeResult<V> => {

    if ( typeof propName !== "string" ) {
        throw new Error("Change : propName must be a string");
    }
    if ( typeof diff !== "function" ) {
        throw new Error("Change : diff function must be a function");
    }


    const prevState = init<T, K, V>(propName, prevProps);

    const hasProp = (
        isObject(nextProps) &&
        hasOwn(nextProps, propName) &&
        nextProps[propName] !== undefined
    );
    const value = hasProp ?
        nextProps[propName]:
        undefined;
    const appeared = !prevState.hasProp && hasProp;
    const removed = prevState.hasProp && !hasProp;

    let didChange: boolean;
    if ( prevState.hasProp && prevState.value !== undefined && hasProp ) {
        didChange = diff(prevState.value, value);
    } else {
        didChange = false;
    }

    return {
        hasProp,
        value,
        appeared,
        removed,
        didChange,
        previousValue: undefined
    };

};


// ex for maybe values
// function opt ( a: { b: string | undefined } ) {
//     const b: string = a.b;
// }
