'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const {Act} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', {session: false});

router.use(jwtAuth);

router.get('/', (req, res) => {
  Act
    .find()
    .then(acts => {
      res.json(acts.map(act => {
        return act.serialize();
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});


router.get('/:id', (req, res) => {
  Act
    .findById(req.params.id)
    .then(act => {
      res.json({
        id: act._id,
        title: act.title,
        date: act.date,
        location: act.location,
        description: act.description,
        kindnessRating: act.kindnessRating
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});


router.post('/', (req, res) => {
  console.log(req.body);
  const requiredFields = ['title', 'date', 'location', 'description', 'kindnessRating'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

    Act
      .create({
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        kindnessRating: req.body.kindnessRating
      })
      .then(act => res.status(201).json(
        act.serialize()
        ))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
      });
});


router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['title', 'date', 'location', 'description', 'kindnessRating'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Act
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedAct => res.status(200).json({
      id: updatedAct.id,
      title: updatedAct.title,
      date: updatedAct.date,
      location: updatedAct.location,
      description: updatedAct.description,
      kindnessRating: updatedAct.kindnessRating
    }))
    .catch(err => res.status(500).json({ message: err }));
});


router.delete('/:id', (req, res) => {
  Act
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted act with id \`${req.params.id}\``);
      res.status(204).end();
    });
});


module.exports = {router};
