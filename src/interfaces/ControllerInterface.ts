export interface ControllerRequest {
  body: Record<string, unknown>;
}

export interface ControllerResponse<T> {
  status: number;
  body: T;
}

export interface ControllerInterface<ResponseBody = Record<string, unknown>> {
  handle(request: ControllerRequest): Promise<ControllerResponse<ResponseBody>>;
}
