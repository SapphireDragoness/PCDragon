class Product {

    constructor(code, name, date, price) {
        this.code = code;
        this.name = name;
        this.data = moment(date);
        this.price = price;
    }

    /**
     * Construct a Product from a plain object
     * @param {*} json 
     * @return {Exam} the newly created Product object
     */
    static from(json) {
        const p = Object.assign(new Product(), json);
        p.date = moment(p.date);
        return p;
    }
}

export default Product;