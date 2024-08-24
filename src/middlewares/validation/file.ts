import Joi from "joi";

export const getFilesDto = Joi.object().keys({
  limit: Joi.number().required(),
});

export const getFilesByFilterDto = Joi.object().keys({
  limit: Joi.number().required(),
  mimetype: Joi.string().optional(),
  name: Joi.string().optional(),
  folderId: Joi.string().optional(),
  trashed: Joi.string().optional(),
  orderByCreatedAt: Joi.string().valid("asc", "desc").optional(),
  orderByName: Joi.string().valid("asc", "desc").optional(),
  startCreatedAt: Joi.string().optional(),
  endCreatedAt: Joi.string().optional(),
});

export const createFileDto = Joi.object().keys({
  name: Joi.string().required(),
  parents: Joi.string()
    .custom((value, helpers) => {
      try {
        const parsed = JSON.parse(value); // JSON stringini parse qiladi

        // Agar array bo'lmasa yoki ichidagi elementlar string bo'lmasa xatolik qaytaradi
        if (
          !Array.isArray(parsed) ||
          !parsed.every((item) => typeof item === "string")
        ) {
          return helpers.error("any.invalid");
        }

        return value; // Agar hammasi to'g'ri bo'lsa, value'ni qaytaradi
      } catch (err) {
        return helpers.error("any.invalid"); // JSON parse qila olmasa xatolik qaytaradi
      }
    })
    .optional(),
  file: Joi.object({
    originalname: Joi.string().required(),
    mimetype: Joi.string().required(),
    buffer: Joi.binary().required(),
  }).optional(),
});

export const updateFileDto = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  parents: Joi.string()
    .custom((value, helpers) => {
      try {
        const parsed = JSON.parse(value);
        if (
          !Array.isArray(parsed) ||
          !parsed.every((item) => typeof item === "string")
        ) {
          return helpers.error("any.invalid");
        }

        return value;
      } catch (err) {
        return helpers.error("any.invalid");
      }
    })
    .optional(),
  file: Joi.object({
    originalname: Joi.string().required(),
    mimetype: Joi.string().required(),
    buffer: Joi.binary().required(),
  }).optional(),
});

export const deleteFileDto = Joi.object().keys({
    id: Joi.string().required(),
});

export const copyFileDto = Joi.object().keys({
    id: Joi.string().required(),
    newFileName: Joi.string().required()
});

export const moveFileDto = Joi.object().keys({
    id: Joi.string().required(),
    newParentId: Joi.string().required()
});

export const moveFileToTrashDto = Joi.object().keys({
    id: Joi.string().required()
});
