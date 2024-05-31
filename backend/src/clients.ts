import * as ws from 'ws';
const clients = new Map<string, Set<ws>>();

export default clients;
