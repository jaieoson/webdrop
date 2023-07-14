
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {

    const  id  = req.query.id;

   
    const tour = await prisma.category.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            photo: true,
         
        }
});
    
    return res.status(201).json({
        tour: {
            title: tour.title,
            photo: tour.photo,
}
    });
    
    
}