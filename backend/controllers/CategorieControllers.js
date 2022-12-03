const Model = require("../models/CategorieModel");

class Controller {
  // getAll(req, res , next ) {
  //   Model.find({} , (err , response) =>{
  //     if(err) return next(err);
  //     res.status(200).send({
  //       success : true,
  //       response
  //     })
  //   })
  // }
  getAll(req, res, next) {
    Model.aggregate(
      [
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "categorie",
            as: "items",
          },
        },
      ],
      (err, categories) => {
        if (err) return next(err);
        res.status(200).send({
          success: true,
          categories,
        });
      }
    );
  }

  getbyId(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }

  post(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }

  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return next(err);
        res.status(200).send({
          success: true,
          response,
        });
      }
    );
  }

  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }
}

const controller = new Controller();
module.exports = controller;
