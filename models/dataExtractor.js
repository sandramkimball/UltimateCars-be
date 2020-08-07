
export const dataExtractor = (data) => {
    let stats = []

    // Callback Func - creates array of model objects: { 'GR Supra' : 7 } 
    const getModels = ( data, make ) => {
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
    const getMakes = ( data ) => {
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
        return allMakes
    };

    const getYears = ( data ) => {
        let allYears = [];

        for ( k in data){
            let car = data[k] 
            if(!allYears.includes(car['year'])){
                allYears.push(car['year'])  
            }
        }

        return appYears.sort()
    };

    const getMaxPrice = ( data ) => {
        let maxPrice = 0;

        for (k in data){
            let car = data[k]
            if( car['price'] > maxPrice ){
                maxPrice = car['price']  
            }
        }

        return maxPrice
    }
    
    try {
        let allMakes = getMakes( data )
        let allYears = getYears( data )
        let maxPrice = getMaxPrice( data )

        stats.push( allMakes)
        stats.push( allYears )
        stats.push ( maxPrice)
        return stats
    
    } catch {
        throw new Error( 'Error extracting data.' )
    }
}


