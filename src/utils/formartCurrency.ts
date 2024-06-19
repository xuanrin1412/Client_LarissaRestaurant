export const formatCurrency = (number: number|undefined) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
