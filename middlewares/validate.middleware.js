import z from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = z.treeifyError(result.error).properties;
      const errorsFormatted = {};
      for (const key in errors) {
        errorsFormatted[key] = errors[key].errors[0];
      }

      return res
        .status(400)
        .json({
          success: false,
          message: "Validation error",
          errors: errorsFormatted,
        });
    }

    req.validatedBody = result.data
  
    next();
  };
};
