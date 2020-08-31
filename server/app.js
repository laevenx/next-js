const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var ObjectID = require("mongodb").ObjectID;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect("mongodb://localhost:27017", (err, database) => {
  if (err) return console.log(err);

  app.listen(3001, () => {
    console.log("app data working on 3001");
  });

  let productDB = database.db("test");

  app.post("/product", (req, res, next) => {
    let product = {
      name: req.body.name,
      amount: req.body.amount,
      price: req.body.price,
      userId: req.body.userId,
    };

    productDB.collection("product").insertOne(product, (err, result) => {
      if (err) throw err;
      res.send({ info: "add product successfully", data: result.ops });
    });
  });

  app.get("/product", (req, res, next) => {
    productDB
      .collection("product")
      .find()
      .toArray((err, results) => {
        res.send(results);
      });
  });

  app.get("/product/:id", (req, res, next) => {
    if (err) {
      throw err;
    }

    let id = ObjectID(req.params.id);
    productDB
      .collection("product")
      .find(id)
      .toArray((err, result) => {
        if (err) {
          throw err;
        }

        res.send(result);
      });
  });

  app.post("/cart", (req, res, next) => {
    let cart = {
      productId: req.body.productId,
      userId: req.body.userId,
      amount_product: req.body.amount_product,
    };

    productDB.collection("cart").insertOne(cart, (err, result) => {
      if (err) throw err;
      res.send({ info: "add cart successfully", data: result.ops });
    });
  });

  app.get("/cart", (req, res, next) => {
    console.log(req.headers["userid"]);

    productDB
      .collection("cart")
      .find({ userId: req.headers.userid })
      .toArray((err, results) => {
        res.send(results);
      });
  });

  app.put("/cart/:id", (req, res, next) => {
    var id = {
      _id: new ObjectID(req.params.id),
    };

    let cart = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    productDB.collection("cart").update(
      id,
      {
        $set: cart,
      },
      (err, result) => {
        if (err) {
          throw err;
        }

        let id = ObjectID(req.params.id);
        cartDB
          .collection("cart")
          .find(id)
          .toArray((err, result) => {
            if (err) {
              throw err;
            }

            res.send({ info: "cart updated sucessfully", result });
          });

        //   res.send("user updated sucessfully");
      }
    );
  });

  app.delete("/cart/:id", (req, res, next) => {
    let id = ObjectID(req.params.id);

    productDB.collection("cart").deleteOne({ _id: id }, (err, result) => {
      if (err) {
        throw err;
      }

      res.send("cart deleted");
    });
  });

  app.post("/checkout", (req, res, next) => {
    let id = ObjectID(req.body.id);
    let total = 0;
    let saldo = 0;
    // console.log(id)

    productDB
      .collection("user")
      .find(id)
      .toArray((err, result) => {
        if (err) {
          throw err;
        }
        // console.log(result)
        result.map( async (e) => {
          console.log(e._id);
         await productDB
            .collection("cart")
            .find({ userId: e._id.toString() })
            .toArray((err, result1) => {
              if (err) {
                throw err;
              }
              // console.log(result1)
              result1.map((cart) => {
                // console.log(cart)
                productDB
                  .collection("product")
                  .find({ _id: ObjectID(cart.productId) })
                  .toArray((err, result2) => {
                    console.log(result2);
                    total = total + result2[0].amount * cart.amount_product;
                  });
              });
              saldo = e.saldo;
              console.log(total);
              if (saldo < total) {
                res.send("insuficient saldo");
              } else {
                saldo -= total;
                productDB.collection("user").updateOne(
                  { _id: id },
                  {
                    $set: { saldo: saldo },
                  },
                  (err, result) => {
                    if (err) {
                      throw err;
                    }

                    // productDB
                    // .collection("cart")
                    // .deleteMany({userId : req.body.id}, (err,result) => {
                    res.send("checkout completed");
                    // })
                  }
                );
              }
            });
        });
      });

    // productDB.collection("user").find({id}, (err, result) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log(result.ops)
    // });

    // productDB.collection("cart").deleteMany({ userId: id }, (err, result) => {
    //   if (err) {
    //     throw err;
    //   }
    // });
  });

  app.post("/login", (req, res, next) => {
    productDB
      .collection("user")
      .find({ email: req.body.email })
      .toArray((err, result) => {
        if (err) {
          throw err;
        }

        console.log(result);

        res.send(result);
      });
  });
  app.post("/register", (req, res, next) => {
    let acc = {
      name: req.body.name,
      emial: req.body.email,
      password: req.body.password,
      saldo: req.body.saldo,
      product: [],
    };

    productDB.collection("user").insertOne(acc, (err, result) => {
      if (err) throw err;
      res.send({ info: "add product successfully", data: result.ops });
    });
  });
});
