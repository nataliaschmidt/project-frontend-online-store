const storage = 'productsLocalStorage';

if (!JSON.parse(localStorage.getItem(storage))) {
  localStorage.setItem(storage, JSON.stringify([]));
}

const addProduct = (objProduct) => {
  const getStorage = JSON.parse(localStorage.getItem(storage));
  const verification = getStorage.find((product) => product.product.id === objProduct.id);
  if (verification) {
    verification.quantity += 1;
  } else {
    getStorage.push({ quantity: 1, product: objProduct });
  }
  localStorage.setItem(storage, JSON.stringify(getStorage));
};

export default addProduct;
