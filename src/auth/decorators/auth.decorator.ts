import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export function Auth(roles?: string[]) {
  const decorators = [UseGuards(JwtAuthGuard, RolesGuard)];

  if (roles && roles.length > 0) {
    decorators.unshift(Roles(...roles));
  }

  return applyDecorators(...decorators);
}
