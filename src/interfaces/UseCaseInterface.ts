export interface UseCaseInterface<I = void, O = void> {
  execute(input: I): O;
}
