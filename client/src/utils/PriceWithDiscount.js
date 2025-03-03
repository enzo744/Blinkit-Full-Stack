export const pricewithDiscount = (price, dis = 1) => {
    // const discountAmount = Math.ceil(Number(price) * (Number(dis) / 100))
    // const actualPrice = Number(price) - Number(discountAmount)
    // return actualPrice
    let discountAmount = (price * dis) / 100
    let actualPrice = price - discountAmount
    return actualPrice.toFixed(2)
}