import Const from "../../Classes/Const";

/**
 * class to hold the data from server
 * the items it's what's the server return,
 * just added the category option for make it simple
 */
class Page {
    genre;
    items;

    constructor(genre, items, price = Const.PRICE) {
        this.genre = genre;
        this.items = items;

        this.mapPrice(price);
    }

    mapPrice(price = Const.PRICE) {
        this.items = this.items?.map(item => ({...item, price: price}));
    }
}

export default Page;