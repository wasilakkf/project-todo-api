export interface ControllerRequest {
  params: Record<string, unknown>;
  body: Record<string, unknown>;
}

export interface ControllerResponse<T> {
  status: number;
  body: T;
}

export interface ControllerInterface<ResponseBody = Record<string, unknown>> {
  handle(request: ControllerRequest): Promise<ControllerResponse<ResponseBody>>;
}
