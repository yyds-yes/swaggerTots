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

export class ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

export class Category {
  id?: number;
  name?: string;
}

export class Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];

  /** pet status in the store */
  status?: "available" | "pending" | "sold";
}

export class Tag {
  id?: number;
  name?: string;
}

export class Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;

  /** Order Status */
  status?: "placed" | "approved" | "delivered";
  complete?: boolean;
}

export class User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;

  /** User Status */
  userStatus?: number;
}
