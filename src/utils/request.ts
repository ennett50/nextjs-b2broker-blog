import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

/**
 * Creates an Axios instance configured for making requests to a Strapi API.
 *
 * The base URL and the authorization token are retrieved from environment variables:
 * - `NEXT_PUBLIC_STRAPI_API_URL` for the Strapi API base URL
 * - `NEXT_PUBLIC_STRAPI_API_TOKEN` for the Bearer token used in the Authorization header
 *
 * The Axios instance is configured with:
 * - A `baseURL` pointing to the Strapi API endpoint, ensuring all requests made with this instance are directed to the specified API.
 * - A `timeout` set to 120,000 milliseconds (2 minutes), which specifies how long the client will wait for a response from the server before aborting the request.
 * - `withCredentials` set to false, indicating that cookies will not be sent along with requests.
 * - `headers`
 *
 * @example
 * strapiRequest.get('/todos')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 *
 * @module strapiRequest
 * @type {AxiosInstance}
 */

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  timeout: 1000 * 60 * 2, // 2 min
  withCredentials: false,
};

export const strapiRequest: AxiosInstance = axios.create(config);
