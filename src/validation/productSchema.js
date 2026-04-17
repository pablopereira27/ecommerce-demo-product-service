const createProductSchema = {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    price: { type: 'number', required: true },
};

const updateProductSchema = {
    name: { type: 'string', required: false },
    description: { type: 'string', required: false },
    price: { type: 'number', required: false },
};

function validate(dto, schema) {
    for (const [field, rules] of Object.entries(schema)) {
        const value = dto[field];
        if (rules.required && (value === undefined || value === null)) {
            throw new Error(`${field} é obrigatório`);
        }
        if (rules.type === 'number' && isNaN(value)) {
            throw new Error(`${field} deve ser um número`);
        }
        if (rules.type === 'string' && typeof value !== 'string') {
            throw new Error(`${field} deve ser uma string`);
        }
    }
    return dto;
}

module.exports = { validate, createProductSchema, updateProductSchema };
