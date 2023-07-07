const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  const error = { status: 400 };
  if (name === undefined || budget === undefined) {
    error.message = "name and budget are required";
  } else if (typeof name !== "string") {
    error.message = "name of account must be a string";
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100";
  } else if (typeof budget !== "number" || isNaN(budget)) {
    error.message = "name of account must be a number";
  } else if (budget < 0 || budget > 1000000) {
    error.message = "budger of account is too large or too small";
  }

  if (error.message) {
    next(error);
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  let isItThere = await Account.getByName(req.body.name);
  if (isItThere.length > 0) {
    next({ status: 400, message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  let idIsValid = await Account.getById(req.params.id);
  if (!idIsValid) {
    next({ status: 404, message: "account not found" });
  } else {
    next();
  }
};
