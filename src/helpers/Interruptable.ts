interface Interruptable {
  sigint (): Promise<Boolean>
  sigterm (): Promise<Boolean>
  sigusr2 (): Promise<Boolean>
}

export { Interruptable }