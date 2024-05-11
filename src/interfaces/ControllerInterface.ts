export interface ControllerRequest {}

export interface ControllerResponse<T = unknown> {
  status: number;
  body: T;
}

export interface ControllerInterface<T = unknown> {
  handle(request: ControllerRequest): Promise<ControllerResponse<T>>;
}
