export default class BusinessController {

    static create = async (data) => {
        console.log('method create called 🎈')
        return ('create called 🚨')
    };

    static getById = async (bid) => {
        console.log('method getById called 🎈')
        return ('getById called 🚨')
    };


    static getAll = async () => {
        console.log('method getAll called 🎈')
        return ('getAll called 🚨')
    };


    static updateById = async (bid, data) => {
        console.log('method updateById called 🎈')
        return ('updateById called 🚨')
    };

}