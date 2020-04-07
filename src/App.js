import React, { Component } from 'react';
import './App.css';
import { JsonRpc, RpcError } from 'eosjs';
import Tables from './containers/table'


export class App extends Component {
    constructor() {
        super();
        this.state = { last_block_id: '', lastTenBlocks: [], loading: false, blockCount: 10 };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.getLatestBlock();
    }
    componentDidUpdate(nextProps, prevState) {
        const { last_block_id, count } = this.state;
        if(prevState.last_block_id !== this.state.last_block_id) {
            if (last_block_id - prevState.last_block_id >= count || prevState.last_block_id === '') {
                const lastTenBlocks = [];
                this.setState({lastTenBlocks: []});
                this.getBlocks(last_block_id, lastTenBlocks);
            } else {
                let order = last_block_id - prevState.last_block_id;
                const newBlocks = [];
                while (order > -1) {
                    newBlocks.push(last_block_id - order);
                    order -= 1;
                }
                this.getBlocks(newBlocks)
            }

        }
    }
    handleClick() {
        this.getLatestBlock();
    }
    async getLatestBlock() {
        try{
            const rpc = new JsonRpc('https://api.eosdetroit.io:443','Access-Control-Allow-Origin');
            const response = await rpc.get_info();
            this.setState({ last_block_id: response.head_block_num });
        } catch (e) {
            console.log('\nCaught exception: ' + e);
            if (e instanceof RpcError)
                console.log(JSON.stringify(e.json, null, 2));
        }
    }
    async getBlocks(latestBlock, existBlock = []) {
            this.setState({loading: true});
            let allBlocks = latestBlock;
            let start = 0;
            while(start < this.state.blockCount) {
                const current = allBlocks - start;
                const lastTenBlocks = existBlock;
                try{
                    start += 1;
                    const rpc = new JsonRpc('https://api.eosdetroit.io:443');
                    const response = await  rpc.get_block(current);
                    console.log('--------- start -------');
                    console.log(`${response.id} transactions will show below this line `);
                    console.log(response.transactions);
                    console.log('-------- end -------');
                    lastTenBlocks.push({timestamp: response.timestamp.toString(), blockId: response.id, actions: response.transactions.length, ...response});
                    this.setState({lastTenBlocks});
                } catch (e) {
                    console.log('\nCaught exception: ' + e);
                    lastTenBlocks.push({blockId: current});
                    if (e instanceof RpcError)
                        console.log(JSON.stringify(e.json, null, 2));
                }
            }
        this.setState({loading: false});

    }
    get block() {
        const { last_block_id } = this.state;
        return (
            <div>
                <div>Look at the last block id below if available :</div>
                <div>{last_block_id ? last_block_id : 'please wait to load latest block id'}</div>
                <div> {last_block_id ? `Waiting for loading block id from ${last_block_id - 9} to ${last_block_id}` : null}</div>
                <button className='retry' onClick={this.handleClick}> Try to get latest data</button>
            </div>
        )
    }
    render(){
        return  (
            <div className="App">
              <header className="App-header">
                <div>
                    {this.block}
                </div>
                  <div>
                      <Tables
                          data={this.state.lastTenBlocks}
                          loading={this.state.loading}
                      >
                      </Tables>
                  </div>
              </header>
            </div>
        );
    }

}
export default App;
