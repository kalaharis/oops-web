import { Injectable } from '@angular/core';
import { RouteState } from 'app/models/route-state';

@Injectable()
export class RouteStateService {
  private routeStates: Map<string, Map<string, any>> = new Map();

  constructor() { }

  saveState(name: string, data: Map<string, any>) {
    this.routeStates.set(name, data);
  }

  getState(name: string): Map<string, any> {
    return this.routeStates.get(name);
  }

}

