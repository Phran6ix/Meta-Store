const axios = require('axios')


const instance = axios.create({
    baseURL: 'https://api.paystack.co/transaction',
    headers: {
       'Authorization': `Bearer ${process.env.PAYSTACK_KEY}`,
        'Content-Type' : "application/json"
    }
})



// const initializePayment = instance.post('/initialize', {
//     email,
//     amount: ProductOnCart.price
// }).then(response => {
//     res.status(200).json({
//         data: response.data
//     })
// }).catch(err => console.log(err))

module.exports = instance