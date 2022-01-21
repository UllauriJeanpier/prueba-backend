import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import { calculateAge } from '../utils/functions';

export const postOne = async (req: Request, res: Response) => {
  try{
    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.status(201).json({ status: 200, msg: 'Creado exitosamente', data: results });
  }catch (err){
    console.log(err)
    return res.status(500).json({
      status:500,
      error: err
    })
  }
}

export const getAverage = async (req: Request, res: Response) => {
  const birthdays = await getRepository(User).find({ select: ['birthday'] })
  let average = 0
  if (birthdays.length > 0) {
    const ages = birthdays.map((b) => calculateAge(b.birthday))
    console.log(ages)
    average = Math.round(ages.reduce((prev, current) => prev + current) / ages.length)
  }
  return res.json({average});
}

export const getList = async (req: Request, res: Response) => {
  const users = await getRepository(User).find();
  return res.json(users);
}

export const deleteById = async (req: Request, res: Response) => {
  const results = await getRepository(User).delete(req.params.id);
  return res.json(results);
}