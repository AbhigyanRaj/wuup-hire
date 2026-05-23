/**
 * Wraps an async Express route handler and forwards any thrown errors
 * to the next() error middleware — no try/catch needed in controllers.
 *
 * Usage: router.get("/", asyncHandler(async (req, res) => { ... }))
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
