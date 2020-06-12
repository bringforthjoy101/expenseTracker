async function checkParamsId (req, res, paramsId) {

  // validates if the ID is an integer
  if (isNaN(Number(paramsId))) {
      return res.status(400).json({
        status: false,
        message: 'Invalid ID passed'
      });
  }
  
  return paramsId;
  
}

module.exports = checkParamsId;