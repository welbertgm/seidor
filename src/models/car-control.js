const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })


exports.list = function () {
    const _keys = myCache.keys()
    const arr = []
    _keys.map(item => {
        arr.push(myCache.get(item))
    })
    return arr
}

exports.findById = async (params) => {
    const res = myCache.get(params.id)
    if (res == undefined) {
        return {}
    } else {
        return res
    }
}

exports.insert = function (params) {  

    const start_parts = params.start.split('/')
    const start = parseInt(start_parts[0]) + parseInt(start_parts[1]) + parseInt(start_parts[2])

    const _keys = myCache.keys()
    const arr = []
    _keys.map(item => {
        arr.push(myCache.get(item))
    })

    let available = true

    arr.map(item => {
        if (available) {
            const item_start_parts = item.start.split('/')
            const item_start = parseInt(item_start_parts[0]) + parseInt(item_start_parts[1]) + parseInt(item_start_parts[2])

            const item_end_parts = params.end.split('/')
            const item_end = parseInt(item_end_parts[0]) + parseInt(item_end_parts[1]) + parseInt(item_end_parts[2])

            if (((start >= item_start) && (start <= item_end)) &&
                (item.driver_id === params.driver_id) && (item.card_id === params.card_id)) {
                available = false
            }
        }
    })

    if (available) {
        const success = myCache.set(params.key, {
            id: params.key,
            start: params.start,
            end: params.end,
            driver_id: params.driver_id,
            car_id: params.car_id,
            description: params.description
        }, 0)
        return params.key
    } else {
        return 'Período não disponível'
    }
}


exports.delete = async function (params) {
    const res = myCache.take(params.id)
    return res
}