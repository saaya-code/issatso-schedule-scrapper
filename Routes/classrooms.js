const express = require('express');
const { Major } = require('../Models/Major');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await Major.find();
  if (result) {
    let classrooms = new Set();
    for (let item of result) {
      const { schedule } = item._doc;
      Object.keys(schedule[1]).forEach(day => {
        Object.keys(schedule[1][day]).forEach(session => {
          schedule[1][day][session].forEach(item => {
            if (item.classroom && item.classroom !== 'A distance') {
              classrooms.add(item.classroom);
            }
          });
        });
      });
    }
    res.send(Array.from(classrooms).sort());
  } else {
    res.send('No schedule found');
  }
});

router.patch("/do", async(req, res)=>{
  const result = await Major.find({})
  const classroomsMap = new Map();
  for(let item of result){
    const { schedule } = item._doc;
    Object.keys(schedule[1]).forEach(day =>{
      Object.keys(schedule[1][day]).forEach(session=>{
        const _currentMajor = item.label 
        const _currentClassroom = schedule[1][day][session][0].classroom.trim()
        const _time = schedule[1][day][session][0].start + " -> " + schedule[1][day][session][0].end

        if(!classroomsMap.has(_currentClassroom)){
          currentTimes = []
          object = new Object();
          object.time = _time
          object.major = _currentMajor
          currentTimes.push(object)
          classroomsMap.set(_currentClassroom, currentTimes);
        }
        else{
          const bigArray = classroomsMap.get(_currentClassroom)
          const updatedObject = new Object();
          updatedObject.time = _time
          updatedObject.major = _currentMajor
          const arr = [...bigArray, updatedObject]
          classroomsMap.set(_currentClassroom, arr)
        }
      })

    })

  }
  
  res.status(200).json({"status":"ok"})
})

module.exports = router;
