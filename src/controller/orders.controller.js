export default class OrdersController {
    static create = async (data) => {
        console.log('method create called 🎈')
        return ('create called 🚨')
    };


    static getById = async (oid) => {
        console.log('method getById called 🎈')
        return ('getById called 🚨')
    };


    static getAll = async () => {
        console.log('method getAll called 🎈')
        return ('getAll called 🚨')
    };


    static updateById = async (oid, data) => { 
        console.log('method updateById called 🎈')
        return ('updateById called 🚨')
    };

}