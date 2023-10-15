export type Item = {
    name: string,
    price: number,
    seller: string,
    category: string,
    description: string
}

export function parseItem(val: any): undefined | Item {
    if (typeof val !== "object" || val === null) {
      console.error("not an item", val)
      return undefined;
    }
  
    if (!('name' in val) || typeof val.name !== "string") {
      console.error("not an object: missing or invalid 'name'", val)
      return undefined;
    }
  
    if (!('description' in val) || typeof val.description !== "string") {
      console.error("not an object: missing or invalid 'description'", val)
      return undefined;
    }
  
    if (!('seller' in val) || typeof val.seller !== "string") {
      console.error("not an object: missing or invalid 'seller'", val)
      return undefined;
    }
  
    if (!('price' in val) || typeof val.price !== "number" ||
        val.price < 0 || isNaN(val.price)) {
      console.error("not an object: missing or invalid 'price'", val)
      return undefined;
    }
  
    if (!('category' in val) || typeof val.category !== "string") {
        console.error("not an object: missing or invalid 'category'", val)
        return undefined;
      }
  
    return {
      name: val.name,
      description: val.description,
      seller: val.seller,
      category: val.category,
      price: val.price
    };
  }