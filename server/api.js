import express from 'express';
import fs from 'fs';
import Poll from './schema';

const router = express.Router();

const cleanString = strToClean => {
  const strLower = strToClean
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
  return strLower.replace(
    /\w\S*/g,
    regStr => regStr.charAt(0).toUpperCase() + regStr.slice(1),
  );
};

const catchFn = (error, res) => {
  console.error(error);
  fs.writeFile(
    'apierror.log',
    JSON.stringify(error.message, null, 4),
    writeErr => console.error(writeErr || 'Log file saved!'),
  );
  res.status(404).send('Bad Request');
};

router.delete('/removepoll/:poll_id', (req, res) => {
  Poll.findOneAndRemove({
    _id: req.params.poll_id,
    creatorId: { $eq: req.user.fbggId },
  })
    .then(message => res.json(message))
    .catch(error => catchFn(error, res));
});

router.post('/newpoll', (req, res) => {
  const pollTitle = cleanString(req.body.pollTitle);
  const choiceNameArr = [];
  choiceNameArr[0] = cleanString(req.body.myChoice);
  for (let i = 1; i <= req.body.rowCount * 3; i += 1) {
    choiceNameArr[i] = cleanString(req.body[`choice${i}`]);
  }
  //Remove duplicate and empty strings
  const choiceNameUniqueArr = Array.from(new Set(choiceNameArr)).filter(String);
  const choiceArr = choiceNameUniqueArr.map(choiceName => ({
    choiceName,
    voteCount: 0,
  }));
  choiceArr[0].voteCount = 1;
  const choiceCount = choiceArr.length;
  const creatorId = req.user.fbggId;
  const newPoll = new Poll({
    pollTitle,
    choiceArr,
    choiceCount,
    voteSum: 1,
    creatorId,
  });

  newPoll
    .save()
    .then(savedPoll => {
      req.session[savedPoll._id] = true;
      res.json(savedPoll);
    })
    .catch(error => catchFn(error, res));
});

router.put('/addchoice/:poll_id', (req, res) => {
  if (req.session[req.params.poll_id]) {
    return res.json({ repeatVote: req.params.poll_id });
  }
  const newChoice = cleanString(req.body.newChoice);
  if (newChoice) {
    return Poll.findOneAndUpdate(
      { _id: req.params.poll_id, 'choiceArr.choiceName': { $ne: newChoice } },
      {
        $push: { choiceArr: { choiceName: newChoice, voteCount: 1 } },
        $inc: { choiceCount: 1, voteSum: 1 },
      },
      { new: true },
    )
      .then(updatedPoll => {
        if (updatedPoll) req.session[req.params.poll_id] = true;
        res.json(updatedPoll);
      })
      .catch(error => catchFn(error, res));
  }
  return res.status(404).send('Name of choice is empty!');
});

router.put('/incrementvote/:poll_id', (req, res) => {
  if (req.session[req.params.poll_id]) {
    return res.json({ repeatVote: req.params.poll_id });
  }
  const choiceIndex = +req.body.choiceNum - 1;
  if (choiceIndex >= 0 && choiceIndex % 1 === 0) {
    return Poll.findOneAndUpdate(
      { _id: req.params.poll_id, choiceCount: { $gt: choiceIndex } },
      {
        $inc: { [`choiceArr.${choiceIndex}.voteCount`]: 1, voteSum: 1 },
      },
      { new: true },
    )
      .then(updatedPoll => {
        if (updatedPoll) req.session[req.params.poll_id] = true;
        res.json(updatedPoll);
      })
      .catch(error => catchFn(error, res));
  }
  return res.status(404).send('Invalid array index!');
});

//Is this required?
router.get('/mypolls/:creatorId', (req, res) => {
  Poll.find({ creatorId: req.params.creatorId })
    .then(myPollsArr => res.json(myPollsArr))
    .catch(error => catchFn(error, res));
});
router.get('/poll/:poll_id', (req, res) => {
  Poll.findOne({ _id: req.params.poll_id })
    .then(poll => res.json(poll))
    .catch(error => catchFn(error, res));
});

router.get('/hello', (req, res) => res.json({ x: 8 }));

export { catchFn };
export default router;
