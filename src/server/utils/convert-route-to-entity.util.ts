const mapping: Record<string, string> = {
  appointments: 'appointment',
  employees: 'employee',
  restaurants: 'restaurant',
  services: 'service',
  users: 'user',
  'working-hours': 'working_hour',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
