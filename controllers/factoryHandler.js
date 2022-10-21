const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createADocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "Sucess",
      data: doc,
    });
  });

exports.getADocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("Document not Found", 404));
    }

    res.status(200).json({
      status: "Success",
      data: doc,
    });
  });

exports.getDocuments = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: "Success",
      range: docs.length,
      data: docs,
    });
  });

exports.updateADocument = (Model, id) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

    if (!doc) {
      return next(new AppError("Document not found", 404));
    }

    res.status(200).json({
      status: "Success",
    });
  });

exports.deleteADocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("Document not found", 404));
    }

    res.status(204).json({
      status: "Success",
    });
  });
