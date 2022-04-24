const fileNotFound = (req, res) => {
  return res.status(404).send({
    message: `File Not Found. Take another look at your URL.`,
  });
};

export default fileNotFound;
