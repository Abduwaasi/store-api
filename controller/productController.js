
import productModel from "../models/productModel.js"
export const getAllProductsStatic = async (req, res) => {

    try {
        const products = await productModel.find({
            company: {
                $regex: "ik", $options: "i"
            }
        })
            .sort("price")
            .select("name price company")
        res.status(200).json({ success: true, message: products, nbHits: products.length });
    } catch (error) {
        console.log(error);
    }

}

export const getAllProducts = async (req, res) => {
    try {
        const { featured, company, name, sort, field, numericFilters } = req.query;
        const queryObject = {};
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }
        if (company) {
            queryObject.company = { $regex: company, $options: 'i' }
        }
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' }
        }
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': 'lte'
            }
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
            const options = ['price', 'rating'];
            filters = filters.split(',').forEach(item => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            })
        }
        let results = productModel.find(queryObject)
        if (sort) {
            const sortList = sort.split(",").join(' ')
            results = results.sort(sortList)
        } else {
            results = results.sort('createdAt')
        }
        if (field) {
            const fieldList = field.split(',').join(' ')
            results = results.select(fieldList)
        }
        // console.log({ queryObject })
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit
        results = results.skip(skip).limit(limit)
        const products = await results;
        res.status(200).json({ products, nbHit: products.length });
    } catch (error) {
        console.log(error);
    }

}