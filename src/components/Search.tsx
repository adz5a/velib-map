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
    result?: geocode.Response;
    id: number;
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

                    const search = <p>{query.value}</p>;
                    let result;
                    if (query.result) {
                        result = <p>{query.result.results[0].formatted_address}</p>;
                    } else {
                        result = <p>{"Pending ..."}</p>
                    }
                    return <li key={idx}>{search}{result}</li>;

                })}
            </ul>
        );

    }
}


export class Search extends React.Component<{}, any> {

    componentWillMount () {
        this.setState({
            queries: []
        });
    }

    render () {
        return (
            <section>
                <Form onSearch={search => {

                    this.setState(state => ({
                        ...state,
                        queries: [
                            ...state.queries,
                            {
                                search
                            }
                        ]
                    }));

                }}/>
                <List queries={this.state.queries}/>
            </section>
        );

    }
}
