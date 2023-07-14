import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();


    const { userId, totalPrice, qtdTotal, itemsCart } = req.body;


    await prisma.cart.create({
      data: {
        userId,
        totalPrice,
        qtdTotal,
        status: "STARTED",
        itemsCart: {
          createMany: {
            data: itemsCart.map((productId: string) => ({ productId: productId })),
              
            
          
          },

        },
      },   
      select: {
        id: true,
      }
    
    });
  
  
    return res.status(201).json({
      id: true,
    });
    
  
}
