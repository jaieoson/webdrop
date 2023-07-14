import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
     
  const { userId, cartId, totalPrice, status  } = req.body;

    


    const { id } = await prisma.order.create({
        data: {
            userId,
            cartId,
            totalPrice,
            status,
      },
      select: {
        id: true,
    },
        });

  return res.status(201).json({
    id: id,
  });
}
    