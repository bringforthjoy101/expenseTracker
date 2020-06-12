function checkParamsId (req, res, resource, paramsId) {

  // validates if the ID is an integer
  if (isNaN(Number(paramsId))) {
      return res.status(400).json({
        status: false,
        message: `Invalid ${resource} ID passed`
      });
  }
  
  return paramsId;
  
}

module.exports = checkParamsId;