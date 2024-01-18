import express from 'express';
import {getAvailableProducts, getTopRestaurants, getFoodsIn30Min} from './shopping.controller';

const router = express.Router();

router.route('/:postalCode').get(getAvailableProducts)
router.route('/top-restaurants/:postalCode').get(getTopRestaurants)
router.route('/foods-in-30-min/:postalCode').get(getFoodsIn30Min)
// router.route('/search/:postalCode').get(getSearchResults)

export const ShoppingRouter = router;