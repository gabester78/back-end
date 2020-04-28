const express = require('express');
const router = express.Router();
const Class = require('./classesModel');


router.get('/', (req, res) => {
    Class.getClasses()
    .then(classes => {
        res.status(200).json(classes);
    })
    .catch(err => {
        res.status(500).json({
          message: 'Failed to get classes',
          error: err
        });
    })
})

router.get('/:id', (req, res) => {
    Class.getById(req.params.id)
    .then(newClass => {
        res.status(200).json(newClass);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

/*
    Expect
    {
        name,
        dateTime,
        duration,
        intensity,
        location,
        maxSize,
        classType,
        imgUrl
    }
*/
router.post('/', validateNewClass, (req, res) => {
  const classData = req.body;

  Class.addClass(classData)
  .then(() => {
    res.status(201).json({ message: "Post Sucessful" });
  })
  .catch(err => {
    res.status(500).json({ 
      message: 'Failed to create new class',
      error: err
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Class.removeClass(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find class with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ 
      message: 'Failed to delete class',
      error: err
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Class.getById(id)
  .then(classes => {
    if (classes) {
      Class.updateClass(changes, id)
      .then(updatedClass => {
        res.json(updatedClass);
      });
    } else {
      res.status(404).json({ message: 'Could not find Class with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ 
      message: 'Failed to update Class',
      error: err
    });
  });
});


/////////////////~~~~~~~~~~~ATTENDEE SECTION~~~~~~~~~~~~~~~~~~~~~~~///////////
// Params: classId
// Returns: list of attendee objects for a given class
router.get('/:id/attendees', async (req, res) => {
  // Get the account ids that match the given class
  const accountIds = await Class.getAccountIds(req.params.id);
  let accounts = [];
  for(let i=0; i<accountIds.length; i++){
    let account = await Class.getAccountById(accountIds[i].accountId);
    accounts.push({
      ...account[0],
      password: undefined
    });
  }
  res.status(200).json(accounts);
})


function validateNewClass(req, res, next){
    const body = req.body;
    if(body.name || body.time || body.duration || body.intensity || body.location || body.maxSize || body.classType || body.imgUrl){
        next();
    }else{
        res.status(401).json({
            message: 'Missing field'
        })
    }
}

module.exports = router;