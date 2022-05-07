/* tslint:disable */
/* eslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * @title Swagger Petstore
 * @version 1.0.6
 * @baseUrl https://petstore.swagger.io/v2
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 */
 import { ApiBase } from './api-base';
 import { CancelToken } from "axios";
export class Api<SecurityDataType = any> extends ApiBase {
  pet = {
    /**
     * No description
     *
     * @tags pet
     * @name UploadFile
     * @summary uploads an image
     * @request POST:/pet/{petId}/uploadImage
     * @secure
     */
    uploadFile: (
      petId: number,
      data: { additionalMetadata?: string; file?: File },
      cancelToken?: CancelToken | undefined,
    ) => this.request<ApiResponse>(`/pet/${petId}/uploadImage`, "POST", data, cancelToken),

    /**
     * No description
     *
     * @tags pet
     * @name AddPet
     * @summary Add a new pet to the store
     * @request POST:/pet
     * @secure
     */
    addPet: (body: Pet, cancelToken?: CancelToken | undefined) => this.request<any>(`/pet`, "POST", body, cancelToken),

    /**
     * No description
     *
     * @tags pet
     * @name UpdatePet
     * @summary Update an existing pet
     * @request PUT:/pet
     * @secure
     */
    updatePet: (body: Pet, cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/pet`, "PUT", body, cancelToken),

    /**
     * @description Multiple status values can be provided with comma separated strings
     *
     * @tags pet
     * @name FindPetsByStatus
     * @summary Finds Pets by status
     * @request GET:/pet/findByStatus
     * @secure
     */
    findPetsByStatus: (
      query: { status: ("available" | "pending" | "sold")[] },
      cancelToken?: CancelToken | undefined,
    ) => this.request<Pet[]>(`/pet/findByStatus${this.addQueryParams(query)}`, "GET", null, cancelToken),

    /**
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     *
     * @tags pet
     * @name FindPetsByTags
     * @summary Finds Pets by tags
     * @request GET:/pet/findByTags
     * @secure
     */
    findPetsByTags: (query: { tags: string[] }, cancelToken?: CancelToken | undefined) =>
      this.request<Pet[]>(`/pet/findByTags${this.addQueryParams(query)}`, "GET", null, cancelToken),

    /**
     * @description Returns a single pet
     *
     * @tags pet
     * @name GetPetById
     * @summary Find pet by ID
     * @request GET:/pet/{petId}
     * @secure
     */
    getPetById: (petId: number, cancelToken?: CancelToken | undefined) =>
      this.request<Pet>(`/pet/${petId}`, "GET", null, cancelToken),

    /**
     * No description
     *
     * @tags pet
     * @name UpdatePetWithForm
     * @summary Updates a pet in the store with form data
     * @request POST:/pet/{petId}
     * @secure
     */
    updatePetWithForm: (
      petId: number,
      data: { name?: string; status?: string },
      cancelToken?: CancelToken | undefined,
    ) => this.request<any>(`/pet/${petId}`, "POST", data, cancelToken),

    /**
     * No description
     *
     * @tags pet
     * @name DeletePet
     * @summary Deletes a pet
     * @request DELETE:/pet/{petId}
     * @secure
     */
    deletePet: (petId: number, cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/pet/${petId}`, "DELETE", null, cancelToken),
  };
  store = {
    /**
     * No description
     *
     * @tags store
     * @name PlaceOrder
     * @summary Place an order for a pet
     * @request POST:/store/order
     */
    placeOrder: (body: Order, cancelToken?: CancelToken | undefined) =>
      this.request<Order>(`/store/order`, "POST", body, cancelToken),

    /**
     * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     *
     * @tags store
     * @name GetOrderById
     * @summary Find purchase order by ID
     * @request GET:/store/order/{orderId}
     */
    getOrderById: (orderId: number, cancelToken?: CancelToken | undefined) =>
      this.request<Order>(`/store/order/${orderId}`, "GET", null, cancelToken),

    /**
     * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     *
     * @tags store
     * @name DeleteOrder
     * @summary Delete purchase order by ID
     * @request DELETE:/store/order/{orderId}
     */
    deleteOrder: (orderId: number, cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/store/order/${orderId}`, "DELETE", null, cancelToken),

    /**
     * @description Returns a map of status codes to quantities
     *
     * @tags store
     * @name GetInventory
     * @summary Returns pet inventories by status
     * @request GET:/store/inventory
     * @secure
     */
    getInventory: (cancelToken?: CancelToken | undefined) =>
      this.request<Record<string, number>>(`/store/inventory`, "GET", null, cancelToken),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name CreateUsersWithArrayInput
     * @summary Creates list of users with given input array
     * @request POST:/user/createWithArray
     */
    createUsersWithArrayInput: (body: User[], cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/user/createWithArray`, "POST", body, cancelToken),

    /**
     * No description
     *
     * @tags user
     * @name CreateUsersWithListInput
     * @summary Creates list of users with given input array
     * @request POST:/user/createWithList
     */
    createUsersWithListInput: (body: User[], cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/user/createWithList`, "POST", body, cancelToken),

    /**
     * No description
     *
     * @tags user
     * @name GetUserByName
     * @summary Get user by user name
     * @request GET:/user/{username}
     */
    getUserByName: (username: string, cancelToken?: CancelToken | undefined) =>
      this.request<User>(`/user/${username}`, "GET", null, cancelToken),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name UpdateUser
     * @summary Updated user
     * @request PUT:/user/{username}
     */
    updateUser: (username: string, body: User, cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/user/${username}`, "PUT", body, cancelToken),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name DeleteUser
     * @summary Delete user
     * @request DELETE:/user/{username}
     */
    deleteUser: (username: string, cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/user/${username}`, "DELETE", null, cancelToken),

    /**
     * No description
     *
     * @tags user
     * @name LoginUser
     * @summary Logs user into the system
     * @request GET:/user/login
     */
    loginUser: (query: { username: string; password: string }, cancelToken?: CancelToken | undefined) =>
      this.request<string>(`/user/login${this.addQueryParams(query)}`, "GET", null, cancelToken),

    /**
     * No description
     *
     * @tags user
     * @name LogoutUser
     * @summary Logs out current logged in user session
     * @request GET:/user/logout
     */
    logoutUser: (cancelToken?: CancelToken | undefined) => this.request<any>(`/user/logout`, "GET", null, cancelToken),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name CreateUser
     * @summary Create user
     * @request POST:/user
     */
    createUser: (body: User, cancelToken?: CancelToken | undefined) =>
      this.request<any>(`/user`, "POST", body, cancelToken),
  };
}
