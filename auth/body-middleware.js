module.exports = (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).json({ error: 'Token or header is not valid' })
    }else{
      next();
    }
  };