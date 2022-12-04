const Model = require("../models/CategorieModel");

class Controller {

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



  async post(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }
    let newPost = await new Model({
      name: req.body.name,
      image: reqFiles,
    });
    newPost.save({}, (error, response) => {
      if (error) return next(error);
      res.status(200).send({ success: true, response });
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
