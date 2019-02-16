var updateQuery = (objectDetails) => {
    var reducer = ([query, values], [key, value]) => (
      (value !== undefined || value !== null)
        ? [query + `\`${key}\` = ?,`, [...values, value]]
        : [query, values]
    )
    let [query, values] = Object.entries(objectDetails).reduce(reducer, ['SET ', []])
  
    query = query.slice(-1) === ',' ? query.slice(0, -1) : query
    return [query, values]
  }
  
  var deleteQuery = (objectDetails) => {
    var reducer = ([query, values], [key, value]) => (
      (value !== undefined || value !== null)
        ? [query + `\`${key}\` = ? AND `, [...values, value]]
        : [query, values]
    )
    let [query, values] = Object.entries(objectDetails).reduce(reducer, ['WHERE ', []])
  
    query = query.slice(-4) === 'AND ' ? query.slice(0, -4) : query
    return [query, values]
  }
  
  var insertQuery = (objectDetails) => {
    var reducer = ([cString, vString, values], [key, value]) => (
      (value !== undefined || value !== null)
        ? [ cString + `\`${key}\`,`, vString + '?,', [...values, value]]
        : [cString, vString, values]
    )
    let [cString, vString, values] = Object.entries(objectDetails).reduce(reducer, ['', '', []])
    cString = cString.slice(-1) === ',' ? cString.slice(0, -1) : cString
    vString = vString.slice(-1) === ',' ? vString.slice(0, -1) : vString
  
    var query = `(${cString}) VALUES(${vString})`
    return [query, values]
  }
  
  var selectQuery = (params) => {
    if (!params || !Object.keys(params).length) {
      return ['', []]
    }
    var reducer = ([query, values], [key, value]) => (
      (value !== undefined && value !== null)
        ? [query + `\`${key}\` = ? AND `, [...values, value]]
        : [query, values]
    )
    let [query, values] = Object.entries(params).reduce(reducer, ['WHERE ', []])
  
    query = query.slice(-4) === 'AND ' ? query.slice(0, -4) : query
    return [query, values]
  }
  
  module.exports = {
    updateQuery,
    insertQuery,
    deleteQuery,
    selectQuery
  }