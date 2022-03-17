import { Router, Request, Response, NextFunction } from 'express';
import { FeedItem } from '../models/FeedItem';
import * as AWS from '../../../../aws';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { UserItems } from '../../userItemsModel/UserItems';
import * as c from '../../../../config/config';
import { User } from '../../users/User'

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({message: 'No authorization headers.'});
    }
  
    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
      return res.status(401).send({message: 'Malformed token.'});
    }
  
    const token = tokenBearer[1];
    return jwt.verify(token, c.config.jwt.secret, (err: any) => {
      if (err) {
        return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
      }
      return next();
    });
  }

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);  // we itterate over each resource and mapping AWS get url to URL from db
            }
    });
    res.send(items);
});


//Add an endpoint to GET a specific resource by Primary Key
router.get('/:id',
    async (req: Request, res: Response) => {
        let { id } = req.params;
        const items = await FeedItem.findOne({where: {item_id: id}});
        if (items){
            items.url =AWS.getGetSignedUrl(items.url);
            res.send(items);
        }
        else{
            res.status(404).send({message:"ID not found"});
        }
    });

router.post("/:id",
    requireAuth,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let { user_id } = req.body;

        const item = await FeedItem.findOne({where: {item_id: id}})
        const user = await User.findOne({where: {user_id: user_id}})
        let has_item = await UserItems.findOne({where: {user_id: user_id}})
        if (user && item && user.money >= item.price){
            
            //da go doopravq
            if (has_item){
                if (has_item.items_id.split("|").includes(id)){
                    return res.send({message:"User already has this game"}) 
                }
                else{
                    has_item.items_id = has_item.items_id+"|"+id
                }
            }
            else {
                has_item = await new UserItems({
                    items_id: id,
                    user_id
                });
            }
            await has_item.save()
            user.money -= item.price
            await user.save()
            console.log(has_item, user)
        }
    })

// Get a signed url to put a new item in the bucket
// The method is coming from aws file
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;
    const price = req.body.price;
    
    const id_item = uuid.v4()
    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            url: fileName,
            price: price,
            item_id: id_item
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;