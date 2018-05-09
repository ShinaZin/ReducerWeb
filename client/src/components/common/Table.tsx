import * as React from 'react';

interface Props {
    cells?: number;
    className?: string;
    cellAutoSize?: boolean;
}

export class Row extends React.Component<Props> {
    render() {
        const cellAutoSize = this.props.cellAutoSize ? ' cell-auto-size' : '';
        const cells = this.props.cells ? ' cells' + this.props.cells : '';
        return (
            <div
                className={
                    this.props.className + ' row ' + cellAutoSize + cells
                }
            >
                {this.props.children}
            </div>
        );
    }
}
