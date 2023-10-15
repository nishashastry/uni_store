import React, { Component, MouseEvent } from 'react';
import { Item, parseItem } from './item';


type ListProps = {
    onAdd: () => void,
    onShow: (item: Item) => void
};

type ListState = {
  items: undefined | ReadonlyArray<Item>; //possibly change to map
  //category: undefined | string;
};

export class Marketplace extends Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);
        this.state = {items: undefined};
    }

    componentDidMount = () => {
      fetch("/api/list")
          .then(this.handleList)
    };

    render = (): JSX.Element => {
      
      if (this.state.items === undefined) {
        return <p>Loading...</p>;
      }
      
      const items: JSX.Element[] = [];
      for(const item of this.state.items){
        <li key={item.name}>
          <a href="#" onClick={(evt) => this.handleShow(evt, item)}>
            <div className="item">
              <div className="photo">image</div>
              <h2 className="itemName">{item.name}</h2>
              <h3 className="price">{item.price}</h3>
            </div>
          </a>
        </li>
        
      
      }
      return ( <div className="items">
        {items}
      </div>)
       
    };

    handleShow = (evt: MouseEvent<HTMLAnchorElement>, item: Item) => {
      evt.preventDefault();
      this.props.onShow(item);
    };

    handleList = (res: Response) => {
      if (res.status === 200) {
        res.json().then(this.handleListJson).catch( 
          () => console.error(`unknown error talking to server`)
        );
      } else {
        console.error(`unknown error talking to server`);
      }
    };

    handleListJson = (vals: any) => {
      if (typeof vals !== "object" || vals === null || !('items' in vals) ||
          !Array.isArray(vals.items)) {
        console.error("bad data from /list: no auctions", vals)
        return;
      }
  
      const items: Item[] = [];
      for (const val of vals.items) {
        const item = parseItem(val);
        if (item !== undefined) {
          items.push(item);
        }
      }
      this.setState({items: items});
    };
}