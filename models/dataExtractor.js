const data = require( "../database/data.json")

try {
    // Create array of model objects: { 'GR Supra' : 7 } 
    getModels = ( data, make ) => {
        let allModels = new Map()

        for ( k in data ){      
            var car = data[k]     
            var model = car['model']
            if( car['make'] === make ){
                if ( !allModels.has( model ) ){
                    allModels.set( model, 1 )
                } else {
                    // Create temporary value, replace object.
                    var v = allModels.get( model )
                    allModels.delete( model )
                    allModels.set( model, v+1 )
                }       
            }     
        }

        allModels = Array.from(allModels, ([name, value]) => ({ name, value }))

        return allModels
    };

    // Create array of make objects: { key: make, value: [array of model objs] }
    getMakes = ( data ) => {
        let allMakes = new Map()

        for ( k in data ){
            let car = data[k]
            var make = car['make']

            // If make is not in array, add key and value (array of matching models).
            if ( !allMakes.has( make ) ){           
                allMakes.set( make, getModels(data, make) )
            }
        }

        allMakes = Array.from(allMakes, ([name, value]) => ({ name, value }))

        return allMakes;
    };

    getYears = ( data ) => {
        let allYears = [];

        for ( k in data){
            let car = data[k] 
            if(!allYears.includes(car['year'])){
                allYears.push(car['year'])  
            }
        }

        return allYears.sort()
    };

    getMaxPrice = ( data ) => {
        let maxPrice = 0;

        for (k in data){
            let car = data[k]
            if( car['price'] > maxPrice ){
                maxPrice = car['price']  
            }
        }

        return maxPrice;
    }
 
} catch {
    console.log('Error extracting data.')
}

console.log( getModels(data, 'Ferrari') )
console.log( getMakes(data) )