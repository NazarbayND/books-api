export interface PrismaError extends Error {
  code: string;
  message: string;
}

export interface GenericError extends Error {
  statusCode?: number;
}
