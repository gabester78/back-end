const db = require('../data/dbConfig');

module.exports = {
    getClasses,
    getById,
    addClass,
    removeClass,
    updateClass,
    addAttendee,
    removeAttendee
}

function getClasses(){
    return db('classes')
   
}

function getById(id){
    return db('classes')
        .where({id})
}

function addClass(newClass){
    return db('classes')
        .insert(newClass, 'id')
        .then(id => {
            return getById(id[0]);
        })
}

function removeClass(id){
    return db('classes')
    .where({id})
    .del();
}

function updateClass(changes, id){
    return db('classes')
    .where({id})
    .update(changes)
    
}

function addAttendee(newAttendee, id){
    return db('classAttendees')
    .insert(newAttendee)
}
function removeAttendee(id){
    return db('classAttendees')
    .where({id})
    .del()
    .then(() => {
        return getClasses(id);
      });
}