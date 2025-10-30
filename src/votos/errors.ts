export function buildNotFound(code: string, message: string, meta?: Record<string, any>) {
  return {
    statusCode: 404,
    error: message,
    code,
    ...(meta ?? {}),
  };
}

export function buildConflict(code: string, message: string, meta?: Record<string, any>) {
  return {
    statusCode: 409,
    error: message,
    code,
    ...(meta ?? {}),
  };
}
