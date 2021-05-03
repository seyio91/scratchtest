const status = {
  success: 200,
  error: 500,
  notfound: 404,
  nocontent: 204,
};

module.exports = (res, statuscode, data, type) => {
  return res.status(status[statuscode]).json({
    status: statuscode,
    [type]: data,
  });
};
