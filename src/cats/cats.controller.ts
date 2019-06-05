import { Controller, Get, Post, Param, Res, Req, Body } from '@nestjs/common';
import { Request,Response } from 'express';
import { CatsService } from './cats.service';
import { Forecast } from './forecast.entity';
import { TvProgram } from './tvprogram.entity';
var jwt = require("jwt-simple");  
var auth = require("../auth.js")();
var users = require("../users.js");  
var cfg = require("../config.js");

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {

  }

  @Post('create')
  create(@Res() res: Response, @Req() req: Request) {
    this.catsService.create(req.body);
    res.send(req.body);
  }

  @Get('findAll')
  findAll() {
    return this.catsService.findAll(); 
  }

  @Get('findOne:id')
  findOne(@Param('id') id: string) {
      id = id.replace(":", "");
      return this.catsService.findOne(id);
  }

  @Post('token')
  token(@Res() res: Response, @Req() req: Request) {
    if (req.body.email && req.body.password) 
    {
      var email = req.body.email;
      var password = req.body.password;
      var user = users.find(function(u) {
          return u.email === email && u.password === password;
      });
      if (user) 
      {
          var payload = {
              id: user.id
          };
          var token = jwt.encode(payload, cfg.jwtSecret);
          res.json({
              token: token
          });
      } 
      else 
      {
          res.sendStatus(401);
      }
    } 
    else 
    {
      res.sendStatus(401);
    }
  }

  @Get('user:id')
  user(@Param('id') id: string, @Res() res: Response, @Req() req: Request) {
    id = id.replace(":", "");
    //Authorization: Bearer Token
    /*if(req.headers.authorization)
      res.json(users[id]);*/
    
    //Authorization: OAuth 2.0
    if(req.query.access_token)
    {
      var payload = {
        id: parseInt(id)
      };
      var token = jwt.encode(payload, cfg.jwtSecret);
      if(req.query.access_token == token)
        res.json(users[id]);
      else
        res.sendStatus(401);
    }
    else
      res.sendStatus(401);
  }

  @Get('findAllForeCast:id')
  async findAllForeCast(@Param('id') id: string, @Res() res: Response, @Req() req: Request) {
    id = id.replace(":", "");
    //Authorization: OAuth 2.0
    if(req.query.access_token)
    {
     var payload = {
       id: parseInt(id)
     };
     var token = jwt.encode(payload, cfg.jwtSecret);
     if(req.query.access_token == token)
       res.json(await this.catsService.findAllForecast());
     else
       res.sendStatus(401);
    }
    else
     res.sendStatus(401);
  }


  @Get('findAllTvProgram:id')
  async findAllTvProgram(@Param('id') id: string, @Res() res: Response, @Req() req: Request) {
    id = id.replace(":", "");
    //Authorization: OAuth 2.0
    if(req.query.access_token)
    {
     var payload = {
       id: parseInt(id)
     };
     var token = jwt.encode(payload, cfg.jwtSecret);
     if(req.query.access_token == token)
       res.json(await this.catsService.findAllTvProgram());
     else
       res.sendStatus(401);
    }
    else
     res.sendStatus(401);
  }




}