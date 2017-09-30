import * as React from 'react';


const noop = () => {};

export interface FormProps {
    onSearch(search: string): void;
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
