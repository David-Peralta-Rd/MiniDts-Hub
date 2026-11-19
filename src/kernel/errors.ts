// kernel/errors.ts — errores tipados
export class KernelError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "KernelError";
  }
}

export class ContentError extends KernelError {
  constructor(message: string) {
    super(message, "CONTENT_ERROR");
    this.name = "ContentError";
  }
}