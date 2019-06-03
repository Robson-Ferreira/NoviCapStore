'use strict'

const products = require('./files/products.json')

class Checkout {

    constructor (pricing_rules) {
        this.pricing_rules = pricing_rules
		this.items = []
        this.total = 0.0
    }

    scan (product_item) {
        // checking if the product_item is in the products.json file
        const [item] = products.filter(product => product.code === product_item.toUpperCase())
        if (!item) {
            throw new Error('Product not found');
        }
        // adding item on array
        this.items.push(item)
        this.apply_discounts()
    }

    apply_discounts () {
        this.apply_bulk_discount()
        this.apply_two_for_one_discount()
        this.calcule_total()
    }

    apply_two_for_one_discount () {
        const pricing_rules = this.pricing_rules;
        let count_items = 0;
        this.items = this.items.map((item) => {
            // checking if the current item has a "two for one discount" and counting how many 
            if ((pricing_rules.two_for_one.items.indexOf(item.code) !== -1)) {
                count_items += 1;
            }
            /* 
            * If the quantity of items that has "two for one discount" is equal to the 
            * quantity established by the price rule, the price of the current item 
            * receives the value established by the rule of price
            */
            if (count_items === pricing_rules.two_for_one.amount_items) {
                item = { ...item, price: pricing_rules.two_for_one.new_price }
                count_items = 0;
            }
            return item
        })
    }

    apply_bulk_discount () {
        const pricing_rules = this.pricing_rules;
        // filtering all items according to bulk items 
        const items = this.items.filter(item => pricing_rules.bulk.items.indexOf(item.code) !== -1)
        // checking if the amount of items equals to amout items stablished by the pricing rules
        if (items.length >= pricing_rules.bulk.amount_items) {
            this.items = this.items.map((item) => {
                item = (pricing_rules.bulk.items.indexOf(item.code) !== -1) ? { ...item, price: pricing_rules.bulk.new_price } : item
                return item
            })
        }
    }

    calcule_total () {
        this.total = this.items.reduce((total, item) => {
            return item.price + total;
        }, 0)
    }
}

module.exports = Checkout