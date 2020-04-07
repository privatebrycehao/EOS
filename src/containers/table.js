import React from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import './table.css'
import 'rsuite-table/dist/css/rsuite-table.css';
const rowKey = 'blockId';
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props} onClick={() => {
        onChange(rowData);
    }}>
        <div> More </div>
    </Cell>
);

export default class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRowKeys: []
        };
        this.handleExpanded = this.handleExpanded.bind(this);
    }
    handleExpanded(rowData, dataKey) {
        const { expandedRowKeys } = this.state;

        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }
        this.setState({
            expandedRowKeys: nextExpandedRowKeys
        });
    }
    render() {
        const { expandedRowKeys } = this.state;
        const data = this.props.data;
        return (
            <Table
                loading={this.props.loading}
                height={500}
                className="block-tables"
                data={data}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                onRowClick={data => {
                    console.log(data);
                }}
                renderRowExpanded={rowData => {
                    return (

                            <div className="block-tables-extend">
                                <pre>{JSON.stringify(rowData, null, 4)}</pre>
                            </div>

                    );
                }}
            >
                <Column width={70} align="center">
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell
                        dataKey="id"
                        expandedRowKeys={expandedRowKeys}
                        onChange={this.handleExpanded}
                    />
                </Column>

                <Column width={600}>
                    <HeaderCell>Block ID</HeaderCell>
                    <Cell dataKey="blockId" />
                </Column>

                <Column width={300}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="timestamp" />
                </Column>

                <Column width={100}>
                    <HeaderCell>actions</HeaderCell>
                    <Cell dataKey="actions" />
                </Column>
            </Table>
        );
    }
}