import { productCollection } from "./product.model.js";
import mongoose from 'mongoose'


export const baseSportsEquipment = {
    sizes: [{
        size: {
            type: String,
            required: true
        },
        colors: [{
            color: {
                type: String,
                required: true
            },
            stock: {
                type: Number,
                required: true
                
            }
        }]
    }],

    weight: {
        type: Number,
        required: true
    }
}

export const baseGroceryAndPetsSchema = {
    brand: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}
export const baseHealthAndBeautySchema = {
    brand: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    scent: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}

export const clothing = productCollection.discriminator('Clothing',
    new mongoose.Schema({

        sizes: [{
            size: {
                type: String,
                required: true
            },
            colors: [{
                color: {
                    type: String,
                    required: true
                },
                stock: {
                    type: Number,
                    required: true
                    
                }
            }]
        }],
        
    },{_id:false}  )
)

export const babyGear = productCollection.discriminator('Baby Gear',
    new mongoose.Schema({

        weightLimit: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        colors: [{
            color: {
                type: String,
                required: true
            },
            stock: {
                type: Number,
                required: true
                
            }
        }]

        
    },{_id:false}  )
)


export const babyToys = productCollection.discriminator('Baby Toys',
    new mongoose.Schema({
        ageLimit: {
            type: String,
            required: true
        },
        colors: [{
            color: {
                type: String,
                required: true
            },
            stock: {
                type: Number,
                required: true
                
            }
        }]
    },{_id:false}  )
)

//Sport related part
export const racquet = productCollection.discriminator('Racquet',
    new mongoose.Schema({
        ...baseSportsEquipment
    },{_id:false}  )
)
export const ball = productCollection.discriminator('Ball',
    new mongoose.Schema({
        ...baseSportsEquipment
    },{_id:false}  )
)
export const bag = productCollection.discriminator('Bag',
    new mongoose.Schema({
        ...baseSportsEquipment
    },{_id:false}  )
)
export const other = productCollection.discriminator('Other',
    new mongoose.Schema({
        ...baseSportsEquipment
    },{_id:false}  )
)



export const medicine = productCollection.discriminator('Medicine',
    new mongoose.Schema({
        form: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        expiryDate: {
            type: Date,
            required: true
        }
    },{_id:false}  )
)


export const food = productCollection.discriminator('Food',
    new mongoose.Schema({
        weight: {
            type: Number,
            required: true
        },
        ...baseGroceryAndPetsSchema
    }
,{_id:false}  )
)
export const drink = productCollection.discriminator('Drink',
    new mongoose.Schema({
        volume: {
            type: Number,
            required: true
        },
        ...baseGroceryAndPetsSchema
    }
,{_id:false}  )
)


export const cosmeticsAndFragrance = productCollection.discriminator('Cosmetics & Fragrance',
    new mongoose.Schema({
        weight: {
            type: Number,
            required: true
        },
        ...baseHealthAndBeautySchema
    }
,{_id:false}  )
)

export const personalCareAndHygiene = productCollection.discriminator('Personal Care & Hygiene',
    new mongoose.Schema({
        volume: {
            type: Number,
            required: true
        },
        ...baseHealthAndBeautySchema
    }
,{_id:false}  )
)

export const homeAppliances = productCollection.discriminator('Home Appliances',
    new mongoose.Schema({

        power: {
            type: Number,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },{_id:false}  )
)

export const phone = productCollection.discriminator('Phone',
    new mongoose.Schema({
        brand: {
            type: String,
            required: true
        },
        storage: {
            type: Number,
            required: true
        },
        ram: {
            type: Number,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        screenSize: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },{_id:false}  )
)

export const tablet = productCollection.discriminator('Tablet',
    new mongoose.Schema({
        brand: {
            type: String,
            required: true
        },
        storage: {
            type: Number,
            required: true
        },
        ram: {
            type: Number,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        screenSize: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },{_id:false}  )
)

export const laptop = productCollection.discriminator('Laptop',
    new mongoose.Schema({
        brand: {
            type: String,
            required: true
        },
        storage: {
            type: Number,
            required: true
        },
        ram: {
            type: Number,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        screenSize: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },{_id:false}  )
)

export const headPhones = productCollection.discriminator('Headphones',
    new mongoose.Schema({
        brand: {
            type: String,
            required: true
        },
        connectionType: {
            type: String,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },{_id:false} )
)

export const smartWatch = productCollection.discriminator('Smartwatch',
    new mongoose.Schema({
        brand: {
            type: String,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        screenSize: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },{_id:false} )
)

export const camera = productCollection.discriminator('Camera',
    new mongoose.Schema({
        brand: {
            type: String,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        screenSize: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }

    },{_id:false} )
)



export const modelMap = {
  "Clothing": clothing,
  "Baby Gear": babyGear,
  "Baby Toys": babyToys,

  // Sports
  "Racquet": racquet,
  "Ball": ball,
  "Bag": bag,
  "Other": other,


  // Medicine
  "Medicine": medicine,


  // Grocery & Pets
  "Food": food,
  "Drink": drink,

  // Health & Beauty
  "Cosmetics & Fragrance": cosmeticsAndFragrance,
  "Personal Care & Hygiene": personalCareAndHygiene,

  // Home
  "Home Appliances": homeAppliances,

  // Electronics
  "Phone": phone,
  "Tablet": tablet,
  "Laptop": laptop,
  "Headphones": headPhones,
  "Smartwatch": smartWatch,
  "Camera": camera
};