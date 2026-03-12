import api from "./axios";

export const getProducts = (page=1) => {
  return api.get(`products/?page=${page}`);
};

export const getProductsByCategory = (category) => {
  return api.get(`products/?category=${category}`);
};

export const getProductDetails = (id) => {
  return api.get(`products/${id}/`);
};