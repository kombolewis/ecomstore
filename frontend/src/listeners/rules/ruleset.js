export default [
    {
      field:'sku',
      display:'SKU',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'unique', rule_value:'product'},
      ]
    },
    {
      field:'name',
      display:'Name',
      rules: [
        {rule:'required', rule_value:true},
      ]
    },
    {
      field:'price',
      display:'Price',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'numeric', rule_value:true},
      ]
    },
    {
      field:'weight',
      display:'Weight',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'numeric', rule_value:true},

      ]
    },
    {
      field:'size',
      display:'Size',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'numeric', rule_value:true},

      ]
    },
    {
      field:'height',
      display:'Height',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'numeric', rule_value:true},

      ]
    },
    {
      field:'width',
      display:'Width',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'numeric', rule_value:true},

      ]
    },
    {
      field:'length',
      display:'Length',
      rules: [
        {rule:'required', rule_value:true},
        {rule:'numeric', rule_value:true},

      ]
    },
    {
      field:'productType',
      display:'Type Switcher',
      rules: [
        {rule:'required', rule_value:true},
      ]
    },
    
  ]