function asyncHandler(fn) {

    return function(req, res, next){
        Promise
        .resolve((req, res, next))
        .catch(next)
    }

}

module.exports = asyncHandler;