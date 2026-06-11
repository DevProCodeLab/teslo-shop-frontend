
export const currencyFormatter = (value: number) => {
    return value.toLocaleString(
        'es-CO',
        {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2
        }
    )
};