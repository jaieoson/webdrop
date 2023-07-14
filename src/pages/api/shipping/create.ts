import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const { userId, cartId, address, number, complementary, district, city, state, zip,  } = req.body;

 


 const { id } = await prisma.shipping.create({
     data: {
     userId,
     cartId,
     address,
     number,
     complementary,
     district,
     city,
     state,
     zip,
   },
   
    select: {
      id: true,
    },
  });

  return res.status(201).json({
    id: id,
  });
}
    