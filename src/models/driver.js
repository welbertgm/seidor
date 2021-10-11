const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })

exports.list = async function () {
    const _keys = myCache.keys()
    const arr = []
    _keys.map(item => {
        arr.push(myCache.get(item))
    })
    return arr

}

exports.findByName = (params) => {
    const _keys = myCache.keys()
    const arr = []
    _keys.map(item => {
        arr.push(myCache.get(item))
    })

    if (params.name !== '') {
        const result = []
        arr.map(item => {
            if ((params.name !== '') && (params.name.toUpperCase() === item.name.toUpperCase())) {
                result.push(item)
            }
        })
        return result
    } else {
        return arr
    }
}

exports.insert = async function (params) {
    const success = myCache.set(params.key, { id: params.key, name: params.name }, 0)
    return success
}


exports.update = async function (params) {
    myCache.take(params.id)
    const success = myCache.set(params.id, { id: params.key, name: params.name }, 0)
    return success

}

exports.delete = async function (params) {
    const res = myCache.take(params.id)
    return res
}