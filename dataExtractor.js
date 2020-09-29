
module.exports = function dataExtractor(data) {
    let stats = []

    /* Callback Func: This returns an array of all models belonging to a car make.
    [ 'M3', 'Miata', 'Super20' ]
    The function is called in getMakes() and the array is stored as a value in an object.
    No need to create a dictionary because getMakes() contains the dictionary. */
    const getModelsForEachMake = ( data, make ) => {
        let allModels = [];
        for ( k in data ){      
            var car = data[k] // data[0] = {'make': 'Mazda', 'model': 'M3'}
            if( car['make'] === make && !allModels.has(car['model']) ){
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
            let car = data[k] // data[1] = {make: 'Dodge'...} 
            var make = car['make']

            // If car make is not in arr, add key:value (array of matching models).
            if ( !allMakes.has( make ) ){           
                allMakes.set( make, getModelsForEachMake(data, make) )
            }
        }

        allMakes = Array.from(allMakes, ([make, model]) => ({ make, model }))
        return allMakes
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
        
    return stats
}



