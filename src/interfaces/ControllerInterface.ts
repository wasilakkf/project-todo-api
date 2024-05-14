export interface ControllerRequest {
  params: Record<string, unknown>;
  body: Record<string, unknown>;
}

export interface ControllerResponse {
  status: number;
  body: Record<string, unknown>;
}

export interface ControllerInterface {
  handle(request: ControllerRequest): Promise<ControllerResponse>;
}
