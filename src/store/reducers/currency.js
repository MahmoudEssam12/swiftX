const INITIAL_STATE = {
    label: "USD",
    symbol: "$"
}

export default function currencyReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_CURRENCY":
            return {
                label: action.payload.label,
                symbol: action.payload.symbol
            }
        default:
            return state
    }
}