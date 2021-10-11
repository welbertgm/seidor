const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })

exports.list = function (params) {
    const _keys = myCache.keys()
    const arr = []
    _keys.map(item =>{
        arr.push(myCache.get(item))
    })    

    if ((params.color !== '') || (params.brand !== '')) {
        const result = []        
        arr.map(item => {            
            if (((params.color !== '') && (params.color.toUpperCase() === item.color.toUpperCase())) ||
                ((params.brand !== '') && (params.brand.toUpperCase() == item.brand.toUpperCase()))) {
                result.push(item)
            }
        })
        return result
    } else {
        return arr
    }
}

exports.findById = async (params) => {
    const res = myCache.get(params.id)
    if (res == undefined) {
        return {}
    } else {
        return res
    }
}

exports.insert = async function (params) {
    const success = myCache.set(params.key, { id: params.key, license_plate: params.license_plate, color: params.color, brand: params.brand }, 0)
    return success
}


exports.update = async function (params) {
    myCache.take(params.id)
    const success = myCache.set(params.id, { id: params.key, license_plate: params.license_plate, color: params.color, brand: params.brand }, 0)
    return success

}

exports.delete = async function (params) {
    const res = myCache.take(params.id)
    return res
}