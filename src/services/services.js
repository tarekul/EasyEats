import axios from 'axios';
const yelpURL = 'https://api.yelp.com/v3/businesses/';



const get = (route) => {
    if (typeof route !== 'string') return Promise.reject('Params were invalid; must be strings');
    return axios({
        url: yelpURL + route,
        method: 'get',
    });
};

const getList = (lat, lon) => {
    if(typeof lat !== 'string' || typeof lat !== 'string') return Promise.reject('Params were invalid; must be strings');
    if (!lat.includes('.') || lon.includes('.')) return Promise.reject('lat & lon must be floating point numbers');
    return axios({
        url: yelpURL + 'search?term=restaurants&latitude=40.7429098&longitude=-73.9418147',
        method: 'get',
    });
};

const parseYelpData = ( {businesses} ) => {
    return new Promise( (resolve, reject) => {
        if (!Array.isArray(businesses) || !businesses.length) return reject('Invalid data passed, Must be a yelp data response');
        const obj = {}
        const a = businesses.reduce( (acc, e, i) => {
            const { name, alias,  display_phone, image_url, price, phone,} = e;
            if(!obj[name]){
                const categories = e.categories.reduce( (acc, e) => {
                    acc.push(e.title)
                    return acc;
                    }, []);
                acc.push({
                    name,
                    display_phone: display_phone || null,
                    phone: phone || null,
                    menu_url: 'https://www.yelp.com/menu/'+alias,
                    image_url: image_url || null, 
                    price: price || null,
                    categories
                })
                obj[name] = true
            }
            
                return acc;
        }, [])
        return resolve(a)
    });
};

const randomArray = (n, length, arr =[]) => {
    if (arr.length === n) {
        return arr;
    };
    const num = Math.floor(Math.random() * length);
    if (arr.includes(num)) {
        return randomArray(n, length, arr);
    } else {
        arr.push(num);
        return randomArray(n, length, arr);
    };
};

const selectRandom = (n, arr) => {
    const randomNums = randomArray(n, arr.length);
    return randomNums.reduce( (a, e) => {
        a.push(arr[e])
        return a;
    }, []);
 };

export {
    get,
    getList,
    parseYelpData,
    selectRandom,
}