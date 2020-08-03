import express, {Request, Response} from 'express';
const router  = express.Router();
const path = require('path');

// GET a word
router.get('/word/:id', (req:Request ,res:Response) => {
    // List.findById(req.params.id)
    //     .populate('places')
    //     .populate('user')
    //     .then(list => {
    //         if (!list) return res.status(404);
    //         return res.status(200).json(list);
    //     })
    //     .catch(err => {
    //         return res.status(500).json(err);
    //     })
})
