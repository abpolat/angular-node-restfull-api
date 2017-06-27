import express from 'express';
import mongoose from 'mongoose'; //mongo connection
import HTTP_STATUS from 'http-status-codes';
import Product from '../model/Product';

let router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/products', (req, res) => {

  Product.find({}, (err, products) => {
    if (err) {
      return console.error(err);
    } else {
      return res.status(HTTP_STATUS.OK).json(products);
    }
  });

});

//POST a new product
router.post('/products', (req, res) => {

  const {name, description, price, currency} = req.body;

  const data = {
    name,
    description,
    price,
    currency,
  };

  Product.create(data, (err, product) => {
    if (err) {
      console.log('GET Error: There was a problem saving: ', err);
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        error: err
      });
    } else {
      //Product has been created
      Product.findById(product._id, (err, product) => {
        if (err) {
          console.log('GET Error: There was a problem retrieving: ', err);
          return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: err
          });
        } else {
          console.log('GET Retrieving ID: ', product._id);
          return res.status(HTTP_STATUS.CREATED).json({
            message: 'New product was created successfully.',
            _id: product._id
          });
        }
      });
    }
  });
});

//Show specific product by id
router.get('/products/:id', (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("Id is not valid.");
    return res.status(HTTP_STATUS.BAD_REQUEST).json({success: false});
  }
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: err
      });
    }

    if (!product) {
      console.log('No product');
      return res.status(HTTP_STATUS.NOT_FOUND).json({success: false});
    }

    console.log('GET Retrieving ID: ' + product._id);
    return res.status(HTTP_STATUS.OK).json(product);
  });

});

// update product by id
router.patch('/products/:id', (req, res) => {

  Product.findById(req.params.id, (err, product) => {

    if (!product) {
      console.log('No product');
      return res.status(HTTP_STATUS.NOT_FOUND).json({success: false});
    }

    const {name, description, price, currency} = req.body;

    const data = {
      name,
      description,
      price,
      currency,
    };

    product.update(data, (err, productID) => {
      if (err) {
        console.log("There was a problem updating the information to the database: ", err);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);
      }

      console.log("Product has been updated successfully");
      return res.status(HTTP_STATUS.OK).json(true);
    });
  });
});


// Delete product by id
router.delete('/products/:id', (req, res) => {

  Product.findById(req.params.id, (err, product) => {
    if (err) {
      return console.error(err);
    }

    if (!product) {
      console.log('No product');
      return res.status(HTTP_STATUS.NOT_FOUND).json({success: false});
    }

    product.remove((err, product) => {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ', err);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          error: err
        });
      }

      console.log('DELETE removing ID: ', product._id);
      return res.status(HTTP_STATUS.NO_CONTENT).json({success: true});
    });
  });

});

export default router;