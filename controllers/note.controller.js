const Note = require('../models/note.model');

exports.findAll = function(req, res) {
  console.log('Note Controller: List call', req.user)
  Note.find({user_id: req.user.id}, function(err, note) {
    if (err) {
      res.send(err);
    } else {
      res.json(note);
    }
  });
};

exports.create = function(req, res) {
  console.log('Note Controller: Add call')
  const new_note = new Note(req.body);
  new_note.user_id = req.user.id;
  Note.create(new_note, function(err, note) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Note added successfully!",
        data: note
      });
    }
  });
};

exports.findById = function(req, res) {
  console.log('Note Controller: Get call')
  Note.findOne({id: req.params.id, user_id: req.user.id}, function(err, note) {
    if (err) {
      res.send(err);
    } else {
      res.json(note);
    }
  });
};

exports.update = function(req, res) {
  console.log('Note Controller: Update call')
  Note.findOne({id: req.params.id, user_id: req.user.id}, function(err, note) {
    if (err) {
      res.send(err);
    } else {
      note.content = req.body.content;
      note.isCompleted = req.body.isCompleted;
      note.save()
        .then(note => {
          res.json(note);
        })
        .catch(err => 
          res.send(err)
        );
    }
  });
};

exports.delete = function(req, res) {
  console.log('Note Controller: Delete call')
  Note.deleteOne({id: req.params.id, user_id: req.user.id}, function(err, note) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        error: false,
        message: 'Note successfully deleted'
      });
    }
  });
};