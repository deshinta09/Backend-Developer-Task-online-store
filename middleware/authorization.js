async function authorization (req,res,next){
    try {
        if(req.user.role==='admin'){
            next()
        } else {
            throw {name : 'forbidden', message:"You are not authorize"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization