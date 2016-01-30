var middleware = function(req,res,next){
	if(req.user.admin)	next();
	else if(req.user.dispatcher)	next();
	else{
		res.json({
			success: false,
			message: 'Not Authorized'
		});
	}
}

module.exports = middleware;