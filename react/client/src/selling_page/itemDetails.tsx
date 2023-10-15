import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Item, parseItem } from './item';

type DetailsProps = {
  item: Item,
  onShow: (item: Item) => void,
  onBack: () => void
};

export class ItemDetails extends Component<DetailsProps> {
    constructor(props: DetailsProps) {
        super(props);
    }

    render = (): JSX.Element => {
        const item = this.props.item;

        return(
        <div>
            
            <h2>{item.name}</h2>
            <div>Image</div>
            <p>{item.price}</p>
            <p>{item.seller}</p>
            <p>{item.description}</p>
            <button type="button" onClick={this.handleBuy}>Add to Cart</button>
            <button type="button" onClick={this.props.onBack}>Back</button>
        </div>
        );
    };

    handleBuy = (_: MouseEvent<HTMLButtonElement>) : void => {
    
    }

}




