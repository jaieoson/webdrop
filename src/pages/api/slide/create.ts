import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();

    const { userId, title, introduction, imgs } = req.body;


    await prisma.profile.create({
      data: {
        userId,
        title,
        introduction,
        imgSlide: {
          createMany: {
            data: imgs.map((img: string) => ({ url: img })),
          },
        },
      },
    });
    return res.status(201).json({});
}
