
// module.exports = function dataExtractor(data) {
function dataExtractor(data) {
    let stats = []

    /* Callback Func: This returns an array of all models belonging to a car make.
    [ 'M3', 'Miata', 'Super20' ]
    The function is called in getMakes() and the array is stored as a value in an object.
    No need to create a dictionary because getMakes() contains the dictionary. */
    const getModelsForEachMake = ( data, make ) => {
        let allModels = [];
        for ( k in data ){      
            var car = data[k] // data[0] = {'make': 'Mazda', 'model': 'M3'}
            if( car['make'] === make && !allModels.includes(car['model']) ){
                allModels.push(car['model'])
            }     
        }
        
        return allModels
    };

    // Create array of objects based on each make: 
    // [ {'Make':'Mazda', 'Models':['M3', 'Miata', 'Super20']}, {...}, {...} ]
    const getMakes = ( data ) => {
        let allMakes = new Map();

        for ( k in data ){
            let car = data[k] // data[1] = {make: 'Dodge', model: 'Viper', ...} 
            let make = car['make']

            // If car make is not in allMakes:
            if ( !allMakes.has( make ) ){     // .has() only works on Map()       
                // Create and add new object {'make', [models]}
                allMakes.set(make, getModelsForEachMake(data, make));
            }
        }

        // Convert to 2D array 
        allMakes = Array.from( allMakes )

        // Convert each sub array to an Object
        let newAllMakes = allMakes.map( car => {
            let newCarObj = new Object();
            newCarObj[car[0]] = car[1]
            car = newCarObj;
            return car;
        })

        return newAllMakes
    };

    const getYears = ( data ) => {
        let allYears = [];

        // each obj in arr
        for ( k in data){
            let car = data[k] 
            if(!allYears.includes(car['year'])){
                allYears.push(car['year'])  
            }
        }

        return {"allYears": allYears.sort()}
    };

    const getMaxPrice = ( data ) => {
        let maxPrice = 0;

        for (k in data){
            let car = data[k]
            if( car['price'] > maxPrice ){
                maxPrice = car['price']  
            }
        }

        return { 'maxPrice': maxPrice }
    }
    
    try {
        // let allMakes = getMakes( data )
        let allYears = getYears( data )
        let maxPrice = getMaxPrice( data )
        let allMakes = getMakes( data )

        // stats.push( allMakes)
        stats.push( allMakes )
        stats.push( allYears )
        stats.push( maxPrice )
    
    } catch {
        throw new Error( 'Error extracting data.' )
    }
        
    console.log(stats)
    return stats
}

let mock = [
    {
        make: 'Dodge',
        model: 'Viper',
        year: 2000,
        price: 50
    },
    {
        make: 'Porche',
        model: 'Carrera',
        year: 1980,
        price: 500
    },
    {
        make: 'Porche',
        model: 'Carrera',
        year: 1979,
        price: 589
    },
    {
        make: 'Mazda',
        model: 'M3',
        year: 2040,
        price: 100
    },{
        make: 'Mazda',
        model: 'Miata',
        year: 2001,
        price: 51
    }
]

dataExtractor(mock)

