import * as React from 'react';
import { Action } from 'redux';
import { geocode } from "./gmap";



const noop = () => {};



export interface FormProps {
    onSearch?(search: string): void;
}
export class Form extends React.Component<FormProps> {
    render () {
        const { onSearch = noop } = this.props;
        return (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const query = e.currentTarget["place"].value as string;
                    onSearch(query);
                }}>
                <input type="text" name="place"/>
                <input type="submit" value="Go !"/>
            </form>
        );

    }
}

export interface Query {
    value: string;
    response?: geocode.Response;
    id: string;
}
export interface ListProps {
    queries: Query[];
}
export class List extends React.Component<ListProps> {
    render () {
        // const { onSearch = noop } = this.props;
        return (
            <ul>
                {this.props.queries.map((query, idx) => {

                    let result;
                    const looking = <p>{query.value}</p>;
                    if (query.response) {
                        const results = query.response.results;
                        if ( results.length > 0 ) {
                            const address = results[0].formatted_address;
                            result = <p>{address}<button>Zoom</button></p>;
                        } else {
                            result = <p>No Results</p>
                        }
                    } else {
                        result = <p>{"Pending ..."}</p>
                    }
                    return <li key={idx}>{looking}{result}</li>;

                })}
            </ul>
        );

    }
}


export interface SearchState {
    queries: Query[];
}
export const addQuery = ( state: SearchState, value: string, id: string ): SearchState => {
    return {
        ...state,
        queries: [
            ...state.queries,
            {
                value,
                id
            }
        ]
    };
};
export const updateQuery = (state: SearchState, response: geocode.Response, id: string): SearchState => {
    // mutates the internal queries array property
    return {
        ...state,
        queries: state.queries.reduce((queries: Query[], query: Query) => {
            if (query.id === id) {
                query.response = response;
            } 
            return queries;
        }, state.queries)
    };

};
export class Search extends React.Component<{}, SearchState> {

    componentWillMount () {
        this.setState({
            queries: []
        });
    }

    render () {
        return (
            <section>
                <Form onSearch={search => {
                    const id = String(Date.now());
                    this.setState(state => addQuery(
                        state,
                        search,
                        id
                    ));
                    geocode.search(search).then(response => {
                        return this.setState(state => updateQuery(
                            state,
                            response,
                            id
                        ));
                    });
                }}/>
                <List queries={this.state.queries}/>
            </section>
        );
    }
}
