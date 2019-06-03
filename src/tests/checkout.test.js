const assert = require('assert')
const discounts = require('./../files/discounts.json')
const Checkout = require('./../checkout');

describe('Checkout', () => {
    it('Scan Item', () => {
        const co = new Checkout(discounts);
        co.scan("TSHIRT")
        co.scan("VOUCHER")
        co.scan("TSHIRT")
        co.scan("MUG")
        co.scan("TSHIRT")
        assert.deepEqual(co.items.length, 5)
    })

    it('Product not found', () => {
        const co = new Checkout(discounts);
        assert.throws(() => co.scan("ROBSON"), Error);
    })
    
    describe('Testing total', () => {
        it('Total should return 32.50', () => {
            const co = new Checkout(discounts);
            co.scan("VOUCHER")
            co.scan("TSHIRT")
            co.scan("MUG")
            assert.deepEqual(co.total, 32.50)
        })
    
        it('Total should return 25.00', () => {
            const co = new Checkout(discounts);
            co.scan("VOUCHER")
            co.scan("TSHIRT")
            co.scan("VOUCHER")
            assert.deepEqual(co.total, 25.00)
        })
    
        it('Total should return 81.00', () => {
            const co = new Checkout(discounts);
            co.scan("TSHIRT")
            co.scan("TSHIRT")
            co.scan("TSHIRT")
            co.scan("VOUCHER")
            co.scan("TSHIRT")
            assert.deepEqual(co.total, 81.00)
        })

        it('Total should return 74.50', () => {
            const co = new Checkout(discounts);
            co.scan("VOUCHER")
            co.scan("TSHIRT")
            co.scan("VOUCHER")
            co.scan("VOUCHER")
            co.scan("MUG")
            co.scan("TSHIRT")
            co.scan("TSHIRT")
            assert.deepEqual(co.total, 74.50)
        })
    })
    
})