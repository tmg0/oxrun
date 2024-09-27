const logger = console

function fibonacci(n: number): number {
  if (n <= 1)
    return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

export const result = fibonacci(10)
logger.log(result)
export default fibonacci(10)
