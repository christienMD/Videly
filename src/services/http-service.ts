import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

interface Entity {
  _id: string;
  title: string;
  genre: {
    _id: string;
    name: string;
  };
  numberInStock: number;
  dailyRentalRate: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>("/movies", {
      signal: controller.signal,
    } as AxiosRequestConfig);
    return { request, cancle: () => controller.abort() };
  }

  delete(id: string) {
    return apiClient.delete(this.endpoint+ '/' + id);
  }

  save<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    if (entity._id) {
      const body = { ...entity };
      const updatedMovie = {
        title: body.title,
        genreId: body.genre._id,
        numberInStock: body.numberInStock,
        dailyRentalRate: body.dailyRentalRate,
      };

      return apiClient.put(this.endpoint+"/" + entity._id, updatedMovie);
    }
  }
}

const create = (endpoint: string) => new HttpService(endpoint)

export default create