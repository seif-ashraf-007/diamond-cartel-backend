const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Diamond schema (for loose diamonds)
const diamondSchema = new Schema({
  type: {
    type: String,
    enum: ['Lab Grown', 'Natural'],
    required: true
  },
  carat: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  clarity: {
    type: String,
    required: true
  },
  cut: {
    type: String
  },
  shape: {
    type: String,
    default: 'Round'
  },
  symmetry: {
    type: String
  },
  polish: {
    type: String
  },
  fluorescence: {
    type: String,
    default: 'None'
  },
  lwRatio: {
    type: Number
  },
  certification: {
    certifier: {
      type: String,
      default: 'IGI'
    },
    number: {
      type: String
    }
  }
});

// Variant schema
const variantSchema = new Schema({
  variantId: {
    type: String,
    required: true
  },
  attributes: {
    // Metal options for jewelry
    metal: {
      type: {
        type: String,
        enum: ['14K', '18K', '950 PT']
      },
      color: {
        type: String,
        enum: ['Yellow Gold', 'Rose Gold', 'White Gold', 'Platinum']
      }
    },
    // Size options 
    size: {
      value: Number,
      unit: {
        type: String,
        enum: ['In', 'cm']
      }
    },
    // Add other variant-specific attributes as needed
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }]
});

// Product schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true
  },
  productType: {
    type: String,
    enum: ['Diamond', 'Colored Diamond', 'Jewellery'],
    required: true
  },
  jewelleryType: {
    type: String,
    enum: ['Earrings', 'Bracelets', 'Necklaces'],
    // Required only if productType is 'Jewellery'
  },
  description: {
    type: String
  },
  basePrice: {
    type: Number,
    required: true
  },
  
  // Diamond details (for loose diamonds)
  diamond: {
    type: diamondSchema,
    // Required only if productType is 'Diamond' or 'Colored Diamond'
  },
  
  // Base jewellery details (common to all variants)
  jewellery: {
    diamondType: {
      type: String,
      enum: ['Lab Grown', 'Natural']
    },
    diamondColor: {
      type: String
    },
    diamondClarity: {
      type: String
    },
    caratTotal: {
      type: Number
    }
  },
  
  // Product variants
  variants: [variantSchema],
  
  // Default/fallback images for the product (when no variant is selected)
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Option compatibilities (which options work with other options)
  compatibilities: [{
    option1: {
      name: String, // e.g., "metal.color"
      value: String  // e.g., "Yellow Gold"
    },
    option2: {
      name: String, // e.g., "metal.type"
      values: [String] // compatible values, e.g., ["14K", "18K"]
    }
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Validate that jewelleryType is provided when productType is 'Jewellery'
productSchema.path('productType').validate(function(value) {
  if (value === 'Jewellery' && !this.jewelleryType) {
    return false;
  }
  return true;
}, 'Jewellery type is required when product type is Jewellery');

// Pre-save hook to update the updatedAt field
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for category display in UI
productSchema.virtual('displayCategory').get(function() {
  if (this.productType === 'Jewellery') {
    return this.jewelleryType;
  }
  return this.productType;
});

// Create indexes for efficient querying
productSchema.index({ productType: 1 });
productSchema.index({ jewelleryType: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'diamond.carat': 1 });
productSchema.index({ 'jewellery.caratTotal': 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;