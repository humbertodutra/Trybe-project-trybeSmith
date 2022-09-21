const verify = (productsIds: number[]) => {
  const products = productsIds;
  if (!products) {
    return { status: 400, message: { message: '"productsIds" is required' } };
  }

  if (products.constructor !== Array) {
    return { status: 422, message: { message: '"productsIds" must be an array' } };
  }

  if (products.length === 0) {
    return { status: 422, message: { message: '"productsIds" must include only numbers' } };
  }
  return null;
};

export default verify;