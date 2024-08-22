import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  QueryParams,
  Req,
  UseBefore,
} from "routing-controllers";
import { ItemsServices } from "./ItemsService";
import { GetQueryParams } from "types/items";
import { AuthMiddleware } from "middlewares/token";
import { Comment, Item, Rating } from "./Items.dto";
import { IReqUser } from "types/user";

@JsonController("/items")
export default class Items {
  private service = new ItemsServices();

  @Get("/")
  async signIn(@QueryParams() query: GetQueryParams) {
    return this.service.getItems(query);
  }

  @Get("/:id")
  async getItemById(@Param("id") id: string) {
    return this.service.getItemById(id);
  }

  @HttpCode(201)
  @Post("/")
  async addItem(@Body() body: Item) {
    return this.service.addItem(body);
  }

  @Post("/comment/:id")
  @UseBefore(AuthMiddleware)
  async createComment(
    @Body() body: Comment,
    @Param("id") id: string,
    @Req() { user }: IReqUser,
  ) {
    return this.service.createComment(id, user, body);
  }

  @Post("/rating/:id")
  @UseBefore(AuthMiddleware)
  async rateItem(
    @Body() body: Rating,
    @Param("id") id: string,
    @Req() { user }: IReqUser,
  ) {
    return this.service.addRating(id, user, body);
  }
}
