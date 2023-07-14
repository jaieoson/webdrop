import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";



// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {

    
    const email = req.body.email;
     
    console.log(email);
   
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          stock: true,
          photo: true,
          tambnail: true,
          imgs: {
            select: {
              url: true,
            }
        }
      }
        },
        carts: {
            select: {
                id: true,
                userId: true,
                productId: true,   
                totalPrice: true,
                qtdTotal: true,
        }
}


      
    },
 
  });

  return res.status(201).json({
    user: user
  });
}
  
