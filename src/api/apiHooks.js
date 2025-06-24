import { apiConfig } from "./apiConfig";
import instance from "./instance";

export const useApi = () => {
  const getEndpoint = (name) => {
    const endpoints = apiConfig;
    const endpoint = endpoints && endpoints.find((e) => e.name === name);
    if (!endpoint)
      throw new Error(`Endpoint ${name} not found for the request.`);
    return endpoint;
  };

  const constructUrl = (endpoint, pathParams) => {
    let url = endpoint.path;
    if (endpoint.hasPathParams && pathParams) {
      Object.keys(pathParams).forEach((param) => {
        url = url.replace(`{${param}}`, pathParams[param]);
      });
    }
    return url;
  };

  const get = async (name, params, headers, pathParams) => {
    const endpoint = getEndpoint(name);
    const url = constructUrl(endpoint, pathParams);
    try {
      const response = await instance.get(url, {
        params,
        headers,
      });
      return response;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  };

  const post = async (name, data, config, pathParams) => {
    const endpoint = getEndpoint(name);
    const url = constructUrl(endpoint, pathParams);
    try {
      const response = await instance.post(url, data, config);
      return response;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  };

  const deleteRequest = async (name, data, config, pathParams) => {
    const endpoint = getEndpoint(name);
    const url = constructUrl(endpoint, pathParams);
    try {
      const response = await instance.delete(url, data, config);
      return response;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  };

  const del = async (name, data, config, pathParams) => {
    console.log("data && 000" + JSON.stringify(data));
    const endpoint = getEndpoint(name);
    const url = constructUrl(endpoint, pathParams);
    try {
      const response = await instance.delete(url, data, config);
      return response;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  };

  const patch = async (name, data, config, pathParams) => {
    const endpoint = getEndpoint(name);
    const url = constructUrl(endpoint, pathParams);
    try {
      const response = await instance.patch(url, data, config);
      return response;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  };

  return { get, post, patch, deleteRequest, del };
};
