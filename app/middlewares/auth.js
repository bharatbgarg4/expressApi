var middleware = function(req,res,next){
	if(req.user) next();
	else{
		res.json({
			success: false,
			message: 'Not Logged In'
		});
	}
}

module.exports = middleware;