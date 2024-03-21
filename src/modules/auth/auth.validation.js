import Joi from "joi";

export const signup={
    body:Joi.object().required().keys({
        userName:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(/^[A-Z][a-z]{2,6}$/)).required().messages({
            'string.pattern.base':'password must be 3-6 letter just alphapt and first one capital'
        }),
        cPassword:Joi.string().valid(Joi.ref('password')).required(),
    })
}