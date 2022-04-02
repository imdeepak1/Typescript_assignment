import { ApiModelProperty, ApiModel, SwaggerDefinitionConstant} from "swagger-express-ts";
@ApiModel({
    description: "User",
    name : "RequestUser"
})
export class RequestAddUser{
    @ApiModelProperty({
        description : "User First Name",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: "ABCD" as string
    })
    firstName: string | undefined 

    @ApiModelProperty({
        description : "User First Name",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: "ABCD" as string
    })
}
