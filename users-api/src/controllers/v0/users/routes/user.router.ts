import { INSPECT_MAX_BYTES } from 'buffer';
import { Router, Request, Response } from 'express';
import { UserItems } from '../../userItemsModel/UserItems';
import { User } from '../models/User';
import { AuthRouter, requireAuth } from './auth.router';
import * as AWS from '../../../../aws';


const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: Request, res: Response) => {
    const items = await User.findAll();
    res.send(items);
});

// router.get('/:id', async (req: Request, res: Response) => {
//     let { id } = req.params;
//     const item = await User.findByPk(id);
//     res.send(item);
// });

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        let  { money_added }  = req.body;
        let { id } = req.params;
        if (isNaN(money_added)){
            return res.status(400).send("Put ammount of money")
        };
        const item = await User.findOne({ where: { user_id: id } });
        if (item === null) {
            return res.status(404).send("No user found with this ID")
        }
        item.money += money_added
        item.save()
        res.send(item) 
    });

    router.get("/:user_id/items", 
    requireAuth,
    async (req: Request, res: Response) => {
        let { user_id } = req.params;

        //let items_all = []
        const items = await UserItems.findOne({ where: { user_id: user_id } });
        res.status(200).send({ids:items.items_id.split("|")})
    })


export const UserRouter: Router = router;